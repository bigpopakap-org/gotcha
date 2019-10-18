import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.jsonp({
    success: true,
    message: 'This is from the API!',
  });
});

app.get('/users', (req, res) => {
  res.jsonp({
    success: true,
    users: [
      {
        username: 'user1',
        age: 25,
      },
      {
        username: 'user2',
        age: 28,
      },
    ],
  });
});

export default app;
