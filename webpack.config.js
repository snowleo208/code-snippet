const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        client: ['./src/index.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve('dist'),
        chunkFilename: '[name].js',
        publicPath: '/',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    enforce: true,
                    chunks: 'all'
                }
            },
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                            "@babel/plugin-proposal-class-properties"
                        ]
                    },
                }
            },
            {
                test: /\.(html|png|jpg)$/,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                    publicPath: 'dist/'
                }
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader?url=false', 'postcss-loader', 'sass-loader'],
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "/"),
        port: 8080,
        publicPath: "http://localhost:8080/dist/",
        https: false,
        headers: { 'Access-Control-Allow-Origin': '*' },
        open: 'http://localhost:8080'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new MiniCssExtractPlugin({ publicPath: './', filename: 'style.min.css' }),
    ]
};
