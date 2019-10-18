import path from 'path';

import express from 'express';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { getInstalledPathSync } from 'get-installed-path';

// Get the location of the client index.html to serve
const CLIENT_MODULE_PATH = getInstalledPathSync('client', {
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

const app = express();

// Serve the client's static assets
app.use(PUBLIC_ASSETS_URL_PATH, express.static(CLIENT_ASSETS_PATH));

// Any other path serves the index.html
// Client-side routing will take care of getting to the right page
app.get('*', async (req, res) => {
  await res.sendFile(CLIENT_INDEX_HTML_PATH);
});

export default app;
