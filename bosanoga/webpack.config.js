
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: ['babel-polyfill', "./src/index.js"],
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
    publicPath: '/',
  },
  devtool: "#eval-source-map",
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      /*{
        test: /\.css$/,
        loader: 'file-loader?name=css/[name].[ext]',
      },*/
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        }
      },
      { 
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader?name=assets/img/[name].[ext]',
      },
      { 
        test: /\.(ico)$/i,
        loader: 'file-loader?name=[name].[ext]',
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: './src/favicon.ico',
    }),
    new Dotenv(),
  ]
};