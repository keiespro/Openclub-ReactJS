const PATHS = require('../paths');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = ({ production = false, browser = false } = {}) => {
  const CSS_LOADER = production ? 'css-loader' : 'css-loader?sourceMap&-minimize';
  const SASS_LOADER = production ? 'sass-loader' : 'sass-loader?sourceMap';

  return {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: [`${CSS_LOADER}`, 'postcss-loader', `${SASS_LOADER}`].join('!')
    }),
    include: [
      PATHS.src
    ]
  };
};
