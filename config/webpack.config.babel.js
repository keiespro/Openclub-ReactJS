import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
  name: 'openclub',
  target: 'web',
  entry: './src/main.jsx',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json']
  },
  output: {
    path: 'build',
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      hash: false,
      inject: 'body',
      favicon: 'src/static/favicon.ico'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        //loader: 'babel-loader?cacheDirectory=true'
        loader: 'babel-loader'
      }
    ]
  }
}
