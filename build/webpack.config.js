const PATHS = require('./paths')
const rules = require('./rules')
const plugins = require('./plugins')
const externals = require('./externals')
const resolve = require('./resolve')

module.exports = (env = '') => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isBrowser = env === 'browser';
  console.log(`Running webpack in ${process.env.NODE_ENV} mode on ${isBrowser ? 'browser' : 'server'}`);
  const node = { __dirname: true, __filename: true };
  const vendor = [
    'react',
    'react-dom',
    'redux',
    'react-redux',
    'react-router',
    'react-router-redux'
  ]

  const prodServerRender = {
    devtool: 'source-map',
    context: PATHS.src,
    entry: { server: '../server/main' },
    target: 'node',
    node,
    externals,
    output: {
      path: PATHS.dist,
      filename: '[name].js',
      publicPath: PATHS.public,
      libraryTarget: 'commonjs2'
    },
    module: { rules: rules({ production: true, browser: false }) },
    resolve,
    plugins: plugins({ production: true, browser: false })
  }

  const prodBrowserRender = {
    devtool: 'cheap-module-source-map',
    context: PATHS.src,
    entry: {
      app: ['./main.jsx'],
      vendor
    },
    node,
    output: {
      path: PATHS.assets,
      filename: '[hash].[name].js',
      publicPath: PATHS.public
    },
    module: { rules: rules({ production: true, browser: true }) },
    resolve,
    plugins: plugins({ production: true, browser: true })
  }

  const devServerRender = {
    devtool: 'sourcemap',
    context: PATHS.src,
    entry: { server: '../server/main' },
    target: 'node',
    node,
    externals,
    output: {
      path: PATHS.dist,
      filename: '[name].dev.js',
      publicPath: PATHS.public,
      libraryTarget: 'commonjs2',
    },
    module: { rules: rules({ production: false, browser: false }) },
    resolve,
    plugins: plugins({ production: false, browser: false })
  }

  const devBrowserRender = {
    devtool: 'cheap-module-source-map',
    context: PATHS.src,
    entry: {
      app: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
        './main.jsx'
      ],
      vendor
    },
    node,
    output: {
      path: PATHS.assets,
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js',
      publicPath: PATHS.public
    },
    module: { rules: rules({ production: false, browser: true }) },
    resolve,
    plugins: plugins({ production: false, browser: true })
  }

  const prodConfig = [prodBrowserRender, prodServerRender]
  const devConfig = isBrowser ? devBrowserRender : [devBrowserRender, devServerRender]
  const configuration = isProduction ? prodConfig : devConfig

  return configuration
};
