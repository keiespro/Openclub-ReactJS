import express from 'express';
import webpack from 'webpack';
import dotenv from 'dotenv';
import setupExpress from './setupExpress';

import middleware from './middleware';

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
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: devBrowserConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

setupExpress(app);

app.get('*', middleware);

app.listen(PORT);
