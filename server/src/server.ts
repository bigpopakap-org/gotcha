import path from 'path';

import { Duration } from 'luxon';
import delay from 'delay';
import express, { Request } from 'express';
import { GOTCHA_RESULT_QUERY_PARAM_NAME, GotchaResult, isGotchaResult } from '@gotcha/shared';

const PORT = process.env.PORT || 3001;
const CLIENT_NODE_MODULE_PATH = path.join(__dirname, '..', 'node_modules', '@gotcha', 'client');

/**
 * The path under which static assets will be served.
 * NOTE: the URL onto which this is mounted has to match the "homepage" field on the client's package.json
 */
const PUBLIC_ASSETS_PATH = '/public';

const app = express();

function getCurrentGotchaResult(req: Request): GotchaResult {
  const gotchaResultParamValue = req.query[GOTCHA_RESULT_QUERY_PARAM_NAME];
  if (
    gotchaResultParamValue &&
    typeof gotchaResultParamValue === 'string' &&
    isGotchaResult(gotchaResultParamValue)
  ) {
    return gotchaResultParamValue;
  } else {
    return 'lose';
  }
}

function getNextGotchaResult(currentGotchaResult: GotchaResult): GotchaResult {
  switch (currentGotchaResult) {
    case 'lose':
      return 'extra-try';
    case 'extra-try':
      return 'gotcha-win';
    case 'gotcha-win':
      return 'share';
    case 'share':
      return 'share';
    default:
      return 'lose';
  }
}

const AFTER_GOTCHA_WIN_DELAY = Duration.fromObject({ seconds: 1 });

app.use(PUBLIC_ASSETS_PATH, express.static(path.join(CLIENT_NODE_MODULE_PATH, 'build')));

app.get('/', async (req, res) => {
  const currentGotchaResult = getCurrentGotchaResult(req);

  if (currentGotchaResult === 'gotcha-win') {
    await delay(AFTER_GOTCHA_WIN_DELAY.as('milliseconds'));
  }

  if (currentGotchaResult !== 'share') {
    const nextGotchaResult = getNextGotchaResult(currentGotchaResult);
    res.redirect(`/?${GOTCHA_RESULT_QUERY_PARAM_NAME}=${nextGotchaResult}`);
  } else {
    res.sendFile(path.join(CLIENT_NODE_MODULE_PATH, 'build', 'index.html'));
  }
});

app.get('*', (req, res) => {
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`gotcha server listening on port ${PORT}`);
});
