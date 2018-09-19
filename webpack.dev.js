const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: "[name].[hash:5].js",
    chunkFilename: "[name].[contenthash:5].js",
  },
  devServer: {
    contentBase: path.join(__dirname, "/"),
    port: 8080,
    publicPath: "http://localhost:8080/dist/",
    https: false,
    hotOnly: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    open: "http://localhost:8080"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-proposal-class-properties", "react-hot-loader/babel"]
          }
        }
      },
    ]
  },
});