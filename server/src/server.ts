import express from 'express';

const PORT = process.env.PORT || 3001;

const server = express();

server.get('/', (req, res) => {
  res.send('Hello World!');
});

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}! 🚀`);
});
