import path from 'path';

import express from 'express';
import { GOTCHA_RESULT_QUERY_PARAM_NAME } from '@gotcha/shared';

const PORT = process.env.PORT || 3001;
const CLIENT_NODE_MODULE_PATH = path.join(__dirname, '..', 'node_modules', '@gotcha', 'client');

const app = express();

// NOTE: the URL onto which this is mounted has to match the "homepage" field on the client's package.json
app.use('/public', express.static(path.join(CLIENT_NODE_MODULE_PATH, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(CLIENT_NODE_MODULE_PATH, 'build', 'index.html'));
});

app.get('*', (req, res) => {
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`gotcha server listening on port ${PORT}`);
});
