import express, { Request } from 'express';

const app = express();

app.get('/', (req, res) => {
  res.jsonp({
    message: 'Placeholder for the API'
  });
});

export default app;
