import path from 'path';

import express from 'express';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { getInstalledPathSync } from 'get-installed-path';

// Get the location of the client index.html to serve
const CLIENT_MODULE_PATH = getInstalledPathSync('@gotcha/client', {
  local: true,
  paths: process.mainModule && process.mainModule.paths,
});
const CLIENT_ASSETS_PATH = path.join(CLIENT_MODULE_PATH, 'build');
const CLIENT_INDEX_HTML_PATH = path.join(CLIENT_ASSETS_PATH, 'index.html');

/**
 * The path under which static assets will be served.
 * NOTE: the URL onto which this is mounted has to match the "homepage" field on the client's package.json
 */
const PUBLIC_ASSETS_URL_PATH = '/public';

// Serve the client's static assets and index.html
const app = express();
app.use(PUBLIC_ASSETS_URL_PATH, express.static(CLIENT_ASSETS_PATH));
app.get('/', async (req, res) => {
  await res.sendFile(CLIENT_INDEX_HTML_PATH);
});

// Redirect any other unhandled requests back to the index
app.get('*', (req, res) => {
  res.redirect('/');
});

export default app;
