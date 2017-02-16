const path = require('path');
const nodeExternals = require('webpack-node-externals');

const config = require('../config');
const rootDir = path.join(__dirname, '..');

module.exports = {
  context: rootDir,
  entry: './server/main',
  output: {
    path: './server',
    filename: 'build.js'
  },
  target: 'node',
  devtool: 'source-map',
  // this allows us to import these filetypes without writing the extension
  resolve: {
    root: [
      rootDir
    ],
    extensions: ['', '.js', '.json', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: config.compiler_babel
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  externals: [nodeExternals()]
}
