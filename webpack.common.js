const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");

module.exports = {
  entry: {
    client: ["./src/index.js"]
  },
  output: {
    filename: "[name].[hash:5].js",
    path: path.join(__dirname, "/dist"),
    chunkFilename: "[name].[contenthash:5].js",
    publicPath: "./dist",
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          enforce: true,
          chunks: "all"
        },
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        }
      }
    },
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
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        }
      },
      {
        test: /\.(png|jpg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          publicPath: "./dist/"
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader?url=false",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new MiniCssExtractPlugin({
      publicPath: "./",
      filename: "style.min.css"
    }),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new HtmlWebpackHarddiskPlugin({
      outputPath: path.resolve(__dirname, "./")
    }),
  ]
};
