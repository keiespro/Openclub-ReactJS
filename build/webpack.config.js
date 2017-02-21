const PATHS = require('./paths');
const rules = require('./rules');
const plugins = require('./plugins');
const externals = require('./externals');
const resolve = require('./resolve');

module.exports = (env = '') => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isBrowser = (env.indexOf('browser') >= 0);
  console.log(`Running webpack in ${process.env.NODE_ENV} mode on ${isBrowser ? 'browser' : 'server'}`);

  const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
  const node = { __dirname: true, __filename: true };

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
  };

  const prodBrowserRender = {
    devtool: 'cheap-module-source-map',
    context: PATHS.src,
    entry: {
      app: ['./main']
    },
    node,
    output: {
      path: PATHS.assets,
      filename: '[name].js', // filename: '[name].[hash:6].js',
      chunkFilename: '[name].[hash].js', // for code splitting. will work without but useful to set
      publicPath: PATHS.public
    },
    module: { rules: rules({ production: true, browser: true }) },
    resolve,
    plugins: plugins({ production: true, browser: true })
  };

  const devServerRender = {
    devtool: 'sourcemap',
    context: PATHS.src,
    entry: { server: '../server/main' },
    target: 'node',
    node,
    externals,
    output: {
      path: PATHS.dist,
      filename: '[name].[hash].js',
      publicPath: PATHS.public,
      libraryTarget: 'commonjs2',
    },
    module: { rules: rules({ production: false, browser: false }) },
    resolve,
    plugins: plugins({ production: false, browser: false })
  };

  const devBrowserRender = {
    devtool: 'eval',
    context: PATHS.src,
    entry: {
      app: ['./main', hotMiddlewareScript]
    },
    node,
    output: {
      path: PATHS.assets,
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js', // for code splitting. will work without but useful to set
      publicPath: PATHS.public
    },
    module: { rules: rules({ production: false, browser: true }) },
    resolve,
    plugins: plugins({ production: false, browser: true })
  };

  const prodConfig = [prodBrowserRender, prodServerRender];
  const devConfig = isBrowser ? devBrowserRender : devServerRender;
  const configuration = isProduction ? prodConfig : devConfig;

  return configuration;
};
