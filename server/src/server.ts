import express from 'express';
import { GOTCHA_RESULT_QUERY_PARAM_NAME } from '@gotcha/shared';

const PORT = process.env.PORT || 3001;

const server = express();

server.get('/', (req, res) => {
  res.send(`Hello World!?${GOTCHA_RESULT_QUERY_PARAM_NAME}=false`);
});

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}! 🚀`);
});
