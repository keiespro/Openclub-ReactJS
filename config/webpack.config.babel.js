import path from 'path'
import envBuilder from './env'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'

const extractSass = new ExtractTextPlugin({
    //filename: "[name].[contenthash].css",
    filename: '[name].[hash].css',
    //disable: process.env.NODE_ENV === "development"
})

const htmlWebpack = new HtmlWebpackPlugin({
  template: 'src/index.html',
  hash: false,
  inject: 'body',
  favicon: 'src/static/favicon.ico'
})

// build stringify env vars and put them as globals
console.log(envBuilder())
const envInsert = new webpack.DefinePlugin({ Env: envBuilder() })

export default {
  name: 'openclub',
  target: 'web',
  entry: './src/main.jsx',
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.jsx', '.json']
  },
  output: {
    path: 'dist',
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  plugins: [
    extractSass,
    htmlWebpack,
    envInsert
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        //loader: 'babel-loader?cacheDirectory=true'
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: ['css-loader', 'sass-loader'],
          // use style-loader in development
          fallback: 'style-loader'
        })
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      { test: /\.woff(\?.*)?$/,  loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?.*)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
      { test: /\.otf(\?.*)?$/,   loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
      { test: /\.ttf(\?.*)?$/,   loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?.*)?$/,   loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]' },
      { test: /\.svg(\?.*)?$/,   loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
      { test: /\.(png|jpg)$/,    loader: 'url-loder?limit=8192' }
    ]
  }
}
