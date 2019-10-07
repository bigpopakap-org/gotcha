import express from 'express';
import { GOTCHA_RESULT_QUERY_PARAM_NAME } from '@gotcha/shared';

const PORT = process.env.PORT || 3001;

const server = express();

server.use('/', express.static('node_modules/@gotcha/client/build'));

server.get('*', (req, res) => {
  res.redirect('/');
});

server.listen(PORT, () => {
  console.log(`gotcha server listening on port ${PORT}`);
});
