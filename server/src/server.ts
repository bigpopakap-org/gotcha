import express from 'express';

import serveClient from './serve-client';
import serveApi from './serve-api';

const PORT = process.env.PORT || 3001;

const app = express();

// First handle any API routes
app.use('/api', serveApi);

// Anything that's not an API route should serve the client app
app.use(serveClient);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
