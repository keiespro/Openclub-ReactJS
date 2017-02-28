import express from 'express';
import webpack from 'webpack';
import dotenv from 'dotenv';
import setupExpress from './setupExpress';
import fs from 'fs';

import middleware from './middleware';
import config from '../config';

const app = express();
const PORT = process.env.PORT || 3000;

// initial express middleware setup
setupExpress(app);

if(process.env.NODE_ENV !== 'production'){
  dotenv.config();

  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackConfig = require('../build/webpack.config')

  const devBrowserConfig = webpackConfig('browser')
  const compiler = webpack(devBrowserConfig)
  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    publicPath: devBrowserConfig.output.publicPath
  }))

  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }))
}

// get the correct hash/asset list to do ssr
fs.readFile(config.paths.dist + '/stats.json', 'utf-8', (err, data) => {
  if (err) { return console.error(err) }
  const stats = JSON.parse(data)
  console.log(stats)
  app.use(middleware(stats.assets))

  // finally start the server listening
  app.listen(PORT)
})
