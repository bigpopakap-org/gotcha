import express from 'express';

const serveApi = express();

serveApi.get('/', (req, res) => {
  res.jsonp({
    message: 'Placeholder for the API',
  });
});

export default serveApi;
