import express from 'express';
import webpack from 'webpack';
import dotenv from 'dotenv';
import setupExpress from './setupExpress';
<<<<<<< HEAD
=======
import fs from 'fs';

>>>>>>> fuu
import middleware from './middleware';
import config from '../config';

// set any globals that the frontend might be able to grab
import config from '../config'
global.globalConfig = config.globals(false)

const app = express();
const PORT = process.env.PORT || 3000;

// initial express middleware setup
setupExpress(app);

if(process.env.NODE_ENV !== 'production'){
  dotenv.config();
<<<<<<< HEAD
  // enable webpack hot module replacement
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../build/webpack.config');
  const devBrowserConfig = webpackConfig('browser');
  const compiler = webpack(devBrowserConfig);
  // console.log('hi compiler');
  compiler.run((err, stats) => {
    console.log('-=-=-=- initial run complete -=-=-=-=-=-')

    const hashedName = `${stats.hash}.[name].js`
    console.log(hashedName)
    devBrowserConfig.output.filename = hashedName
    devBrowserConfig.output.chunkFilename = hashedName
    const hmrCompiler = webpack(devBrowserConfig)
    global.hash = stats.hash;
    app.use(webpackDevMiddleware(hmrCompiler, {
      hot: true,
      publicPath: '/assets/'
    }));

    app.use(webpackHotMiddleware(hmrCompiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000,
    }));

  });
}

/*app.use((req, res) => {
  console.log(res.locals)
});*/

setupExpress(app);

app.get('*', middleware);
=======

  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackConfig = require('../build/webpack.config')

  const devBrowserConfig = webpackConfig('browser')
  const compiler = webpack(devBrowserConfig)
  app.use(webpackDevMiddleware(compiler, {
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
>>>>>>> fuu

  // finally start the server listening
  app.listen(PORT)
})
