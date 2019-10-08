import path from 'path';

import sleep from 'await-sleep';
import express, { Request } from 'express';
import { GOTCHA_RESULT_QUERY_PARAM_NAME, GotchaResult, isGotchaResult } from '@gotcha/shared';

const PORT = process.env.PORT || 3001;
const CLIENT_NODE_MODULE_PATH = path.join(__dirname, '..', 'node_modules', '@gotcha', 'client');

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

// NOTE: the URL onto which this is mounted has to match the "homepage" field on the client's package.json
app.use('/public', express.static(path.join(CLIENT_NODE_MODULE_PATH, 'build')));

app.get('/', async (req, res) => {
  const currentGotchaResult = getCurrentGotchaResult(req);

  if (currentGotchaResult !== 'share') {
    if (currentGotchaResult === 'gotcha-win') {
      await sleep(1000);
    }

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
