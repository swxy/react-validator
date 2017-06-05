/**
 * @file webpack 配置文件
 * @link https://webpack.js.org/guides/hmr-react/
 * Created by swxy on 2017/4/1.
 */

const {resolve} = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //context: resolve(__dirname, 'demo'),

    entry: {
        main: [
            'react-hot-loader/patch',
            // activate HMR for React

            'webpack-dev-server/client?http://localhost:5000',
            // bundle the client for webpack-dev-server
            // and connect to the provided endpoint

            'webpack/hot/only-dev-server',
            // bundle the client for hot reloading
            // only- means to only hot reload for successful updates

            './demo/index.js'
            // the entry point of our app
        ],
        vendor: ['react', 'react-dom']
    },
    output: {
        filename: '[name].js',
        // the output bundle

        path: resolve(__dirname, 'dist'),

        publicPath: '/'
        // necessary for HMR to know where to load the hot update chunks
    },

    devtool: 'inline-source-map',

    devServer: {
        hot: true,
        // enable HMR on the server

        contentBase: resolve(__dirname, 'dist'),
        // match the output path

        publicPath: '/',
        // match the output `publicPath`

        port: 5000
        // do not use default port
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', "css-loader" ,"less-loader"/*'css-loader?modules', 'postcss-loader'*/],
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader" ,"less-loader"]
            }
        ],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally

        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates

        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'] // Specify the common bundle's name.
        }),

        new HtmlWebpackPlugin({
            template: './demo/simple-form.html'
        })
    ],
};