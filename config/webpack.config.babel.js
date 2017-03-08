import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import env from './env'

export default {
  name: 'openclub',
  target: 'web',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/main.jsx'
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json']
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        //loader: 'babel-loader?cacheDirectory=true'
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', {
          loader: 'sass-loader?sourceMap',
          options: {
            includePaths: ['node_modules', 'src']
          }
        }]
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader?sourceMap']
      }
    ]
  },
  devServer: {
    //hot: true,
    contentBase: 'dist',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin(env),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      hash: false,
      inject: 'body',
      favicon: 'src/static/favicon.ico'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}
