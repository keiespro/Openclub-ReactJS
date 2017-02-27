const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../config/index')
const fs = require('fs')

module.exports = ({ production = false, browser = false } = {}) => {
  const bannerOptions = { raw: true, banner: 'require("source-map-support").install();' }
  const compress = { warnings: false }

  const ExtractText = new ExtractTextPlugin({ filename: '[name].[hash].css', allChunks: true })
  const CommonChunks = new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor']
  })

  function BuildStats() {
    this.plugin('done', (stats) => {
      console.log('\n-=-=-=- Writing Stats Hash -=-=-=-')
      console.log(stats.hash)
      console.log(stats.toJson().assetsByChunkName)
      fs.writeFileSync(config.paths.dist + '/stats.json', JSON.stringify({
        assets: stats.toJson().assetsByChunkName,
        hash: stats.hash
      }))
    })
  }

  if (!production && !browser) {
    return [
      new webpack.DefinePlugin(config.globals()),
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      ExtractText,
      new webpack.BannerPlugin(bannerOptions)
    ]
  }
  if (!production && browser) {
    return [
      BuildStats,
      CommonChunks,
      new webpack.DefinePlugin(config.globals()),
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.NamedModulesPlugin(),
      ExtractText,
      new webpack.NoEmitOnErrorsPlugin()
    ]
  }
  if (production && !browser) {
    return [
      new webpack.DefinePlugin(config.globals()),
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.BannerPlugin(bannerOptions),
      ExtractText,
      new webpack.optimize.UglifyJsPlugin({ compress })
    ]
  }
  if (production && browser) {
    return [
      BuildStats,
      CommonChunks,
      new webpack.DefinePlugin(config.globals()),
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      ExtractText,
      new webpack.optimize.UglifyJsPlugin({ compress })
    ]
  }
  return []
}
