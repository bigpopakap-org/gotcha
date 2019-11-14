import express from 'express';

import serveClient from 'serve-client';
import serveApi from 'serve-api';

const PORT = process.env.PORT || 3001;

const app = express();

app.use('/api', serveApi);
app.use(serveClient);

app.listen(PORT, () => {
  console.log(`gotcha server listening on port ${PORT}`);
});
