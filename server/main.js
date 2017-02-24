import express from 'express';
import webpack from 'webpack';
import dotenv from 'dotenv';
import setupExpress from './setupExpress';
import fs from 'fs';

import middleware from './middleware';
import config from '../config';

const app = express();
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
  // enable webpack hot module replacement
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../build/webpack.config');
  const devBrowserConfig = webpackConfig('browser');
  const compiler = webpack(devBrowserConfig);
  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    stats: {
      hash: true
    },
    publicPath: devBrowserConfig.output.publicPath,
    filename: devBrowserConfig.output.filename
  }));

  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));

  app.use((req, res, next) => {
    fs.readFile(config.paths.dist + '/stats.json', (err, data) => {
      if (err) console.error(err);
      global.hash = JSON.parse(data).hash;
      next();
    });
  });
}

setupExpress(app);

app.get('*', middleware);

app.listen(PORT);
