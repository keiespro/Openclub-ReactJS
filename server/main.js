import express from 'express';
import webpack from 'webpack';
import dotenv from 'dotenv';
import setupExpress from './setupExpress';

import middleware from './middleware';

const app = express();

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

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__AUTH0_CLIENT_ID__ = process.env.OCA_AUTH0_CLIENT_ID;
global.__AUTH0_DOMAIN__ = process.env.OCA_AUTH0_DOMAIN;

app.use(express.static('../dist'));

app.get('*', middleware);

app.listen(process.env.PORT);
