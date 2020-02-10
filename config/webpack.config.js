const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

const paths = require('./paths')

const config = {
  entry: './src/scripts/index.js',
  output: {
    path: path.resolve(paths.appRoot, 'build'),
    filename: '[name].[hash].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    hot: true,
    inline: true,
    port: 3000
  },
  plugins: [
    new CleanWebpackPlugin(),
    new OpenBrowserPlugin({ url: 'http://localhost:3000' }),
    new HtmlWebpackPlugin({ template: paths.appIndex })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              root: path.resolve(paths.appRoot, 'src'),
              esModule: false
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false
            }
          }
        ]
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png',
              esModule: false
            }
          }
        ]
      }
    ]
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}

module.exports = config
