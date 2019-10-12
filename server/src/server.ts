import path from 'path';

import { Duration } from 'luxon';
import delay from 'delay';
import express, { Request } from 'express';
import { GOTCHA_RESULT_QUERY_PARAM_NAME, GotchaResult, isGotchaResult } from '@gotcha/shared';

const PORT = process.env.PORT || 3001;
const CLIENT_ASSETS_PATH = path.join(
  __dirname,
  '..',
  '..',
  'node_modules',
  '@gotcha',
  'client',
  'build'
);

/**
 * The path under which static assets will be served.
 * NOTE: the URL onto which this is mounted has to match the "homepage" field on the client's package.json
 */
const PUBLIC_ASSETS_URL_PATH = '/public';

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

const LOAD_DELAY_AFTER_GOTCHA_WIN = Duration.fromObject({ seconds: 1 });

app.use(PUBLIC_ASSETS_URL_PATH, express.static(CLIENT_ASSETS_PATH));

app.get('/', async (req, res) => {
  const currentGotchaResult = getCurrentGotchaResult(req);

  if (currentGotchaResult === 'gotcha-win') {
    await delay(LOAD_DELAY_AFTER_GOTCHA_WIN.as('milliseconds'));
  }

  if (currentGotchaResult !== 'share') {
    const nextGotchaResult = getNextGotchaResult(currentGotchaResult);
    res.redirect(`/?${GOTCHA_RESULT_QUERY_PARAM_NAME}=${nextGotchaResult}`);
  } else {
    res.sendFile(path.join(CLIENT_ASSETS_PATH, 'index.html'));
  }
});

app.get('*', (req, res) => {
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`gotcha server listening on port ${PORT}`);
});
