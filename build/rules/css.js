const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcssImport = require('postcss-import');
const postcssCssnext = require('postcss-cssnext');
const postcssReporter = require('postcss-reporter');
const PATHS = require('../paths');

module.exports = ({ production = false, browser = false } = {}) => {
  const localIndentName = 'localIdentName=[name]__[local]___[hash:base64:5]';

  const createCssLoaders = embedCssInBundle => ([
    {
      loader: embedCssInBundle ? 'css-loader' : 'css-loader/locals',
      options: {
        localIndentName,
        sourceMap: true,
        modules: true,
        importLoaders: 1
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: [
          postcssImport({ path: path.resolve(PATHS.src, './styles') }),
          postcssCssnext({ browsers: ['> 1%', 'last 2 versions'] }),
          postcssReporter({ clearMessages: true }),

        ]
      }
    },
    {
      loader: "sass-loader",
      options: {
          includePaths: path.resolve(PATHS.src, './styles')
      }
    }
  ]);

  const createBrowserLoaders = extractCssToFile => loaders => {
    if (extractCssToFile) {
      return ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: loaders
      });
    }
    return [{ loader: 'style-loader' }, ...loaders];
  };

  const serverLoaders = createCssLoaders(false);
  const browserLoaders = createBrowserLoaders(production)(createCssLoaders(true));

  return {
    test: /\.(css|scss)$/,
    use: browser ? browserLoaders : serverLoaders,
    include: PATHS.src
  };
};
