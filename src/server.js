import express from 'express';

import setupExpress from './utils/server/setupExpress';
import middleware from './utils/server/middleware';
import assets from './assets.json'; // eslint-disable-line import/no-unresolved

const app = express();
const PORT = process.env.PORT || 3000;

// initial express middleware setup
setupExpress(app);

app.use(middleware([
  assets.vendor.js,
  assets.client.js
]))

// finally start the server listening
app.listen(PORT)
