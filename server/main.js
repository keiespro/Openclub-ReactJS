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
  // console.log('hi compiler');
  // compiler.run((err, stats) => {
  //   global.hash = stats.hash;
  // });
  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    publicPath: '/assets/'
  }));

  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));
}

app.use((req, res) => {
  console.log(res.locals)
});

setupExpress(app);

app.get('*', middleware);

app.listen(PORT);
