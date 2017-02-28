const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcssImport = require('postcss-import');
const postcssCssnext = require('postcss-cssnext');
const postcssReporter = require('postcss-reporter');
const PATHS = require('../paths');

module.exports = ({ production = false, browser = false } = {}) => {
  const CSS_LOADER = production ? 'css-loader' : 'css-loader?sourceMap&-minimize';

  return {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: ['style-collector-loader', 'style-loader', `${CSS_LOADER}`, 'postcss-loader']
    }),
    include: [
      PATHS.src
    ]
  };

  // const localIndentName = 'localIdentName=[name]__[local]___[hash:base64:5]';
  //
  // const createCssLoaders = embedCssInBundle => ([
  //   {
  //     loader: ExtractTextPlugin.extract("style", "css!sass")
  //   },
  //   {
  //     loader: embedCssInBundle ? 'css-loader' : 'css-loader/locals',
  //     options: {
  //       localIndentName,
  //       sourceMap: true,
  //       modules: true,
  //       importLoaders: 1
  //     }
  //   },
  //   {
  //     loader: 'postcss-loader',
  //     options: {
  //       plugins: [
  //         postcssImport({ path: path.resolve(PATHS.src) }),
  //         postcssCssnext({ browsers: ['> 1%', 'last 2 versions'] }),
  //         postcssReporter({ clearMessages: true }),
  //
  //       ]
  //     }
  //   }
  // ]);
  //
  // const createBrowserLoaders = extractCssToFile => loaders => {
  //   const browserLoaders = [
  //     {
  //       loader: ExtractTextPlugin.extract("style", "css!sass")
  //     }
  //     // { loader: 'style-loader' }
  //   ]
  //   if (extractCssToFile) {
  //     // We want CSS as a file
  //     return ExtractTextPlugin.extract({
  //       fallback: 'style-loader',
  //       use: loaders
  //     });
  //   }
  //   return [...browserLoaders, ...loaders];
  // };
  //
  // const serverLoaders = createCssLoaders(false);
  // const browserLoaders = createBrowserLoaders(production)(createCssLoaders(true));
  //
  // return {
  //   test: /\.css$/,
  //   use: browser ? browserLoaders : serverLoaders,
  //   include: PATHS.src
  // };
};
