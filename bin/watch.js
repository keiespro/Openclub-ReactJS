import express from 'express';
import _debug from 'debug';
import webpack from 'webpack';
import config from '../config';
import webpackConfig from '../build/webpack.config';

let compiler = webpack(webpackConfig);

let host = config.server_hmr_host;
let port = config.server_hmr_port;

let serverOptions = {
  contentBase: 'http://' + host + ':' + port,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true}
};

const debug = _debug('app:bin:watch');
let app = express();

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    debug(`Webpack development server is now running at ${host}:${port}.`);
  }
});
