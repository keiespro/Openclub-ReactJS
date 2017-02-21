const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const config = require('../config/index');

module.exports = ({ production = false, browser = false } = {}) => {
  const bannerOptions = { raw: true, banner: 'require("source-map-support").install();' };
  const compress = { warnings: false };

  const ExtractText = new ExtractTextPlugin({ filename: '[name].[hash].css', allChunks: true });
  const CommonChunks = new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: (module) => module.context && module.context.indexOf('node_modules') !== -1
  });
  const Manifest = new ChunkManifestPlugin({
    filename: "manifest.json",
    manifestVariable: "webpackManifest"
  });


  if (!production && !browser) {
    return [
      new webpack.DefinePlugin(config.globals),
      new webpack.optimize.CommonsChunkPlugin({
          names: ['commons'],
          filename: "commons.[hash].js",
          async: true
      }),
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      ExtractText,
      new webpack.BannerPlugin(bannerOptions)
    ];
  }
  if (!production && browser) {
    return [
      CommonChunks,
      Manifest,
      new webpack.DefinePlugin(config.globals),
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      ExtractText,
      new webpack.NoEmitOnErrorsPlugin()
    ];
  }
  if (production && !browser) {
    return [
      new webpack.DefinePlugin(config.globals),
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.BannerPlugin(bannerOptions),
      ExtractText,
      new webpack.optimize.UglifyJsPlugin({ compress })
    ];
  }
  if (production && browser) {
    return [
      CommonChunks,
      Manifest,
      new webpack.DefinePlugin(config.globals),
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      ExtractText,
      new webpack.optimize.UglifyJsPlugin({ compress })
    ];
  }
  return [];
};
