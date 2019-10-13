import path from 'path';

import express, { Request } from 'express';

// TODO get this path from some magic function that gives you the installation path of a node module
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

app.use(PUBLIC_ASSETS_URL_PATH, express.static(CLIENT_ASSETS_PATH));

app.get('/', async (req, res) => {
  res.sendFile(path.join(CLIENT_ASSETS_PATH, 'index.html'));
});

app.get('*', (req, res) => {
  res.redirect('/');
});

export default app;
