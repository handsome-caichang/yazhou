'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const config = require('../config')
var dev = config.dev
var proxys = config.proxy

var sourceMap = { "sourceMap": dev.cssSourceMap }
var port = 9999
// 获取本地IP
var ServerHost = (function getIPAdress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
})()

const devWebpackConfig = merge(baseWebpackConfig, {
    output: {
        path: dev.assetsRoot,
        filename: utils.assetsPath('public/plugin/plugin/[name].js'),
        chunkFilename: utils.assetsPath('public/plugin/plugin/[name].js'),
        publicPath: dev.assetsPublicPath
    },

    module: {
        rules: utils.styleLoaders({
            sourceMap: config.dev.cssSourceMap, 
            extract: true,
            usePostCSS: true
        }).concat([
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 50000,
                    name: utils.assetsPath('public/plugin/assets/img/[name].[hash:7].[ext]')
                }
            }, {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 50000,
                    name: utils.assetsPath('public/plugin/assets/media/[name].[hash:7].[ext]')
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 50000,
                    name: utils.assetsPath('public/plugin/assets/fonts/[name].[hash:7].[ext]')
                }
            }
        ])
    },

    devtool: dev.jsSourceMap ? 'cheap-module-eval-source-map' : false,

    devServer: {
        clientLogLevel: 'warning',
        hot: true,
        // contentBase: false,
        contentBase: dev.assetsRoot,
        compress: true,
        https: true,
        host: '0.0.0.0',
        port: port,
        disableHostCheck: true,
        open: true,
        openPage: '',
        overlay: true,
        publicPath: dev.assetsPublicPath,
        proxy: proxys,
        quiet: true, // necessary for FriendlyErrorsPlugin
        inline: true,
        public: `${ServerHost}:${port}`,
        progress: true,
        setup: app => {
            app.use('*', (req, res, next) => {
                res.header("Access-Control-Allow-Credentials", "true")
                res.header("Access-Control-Allow-Origin", "*")
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
                res.header("Access-Control-Allow-Methods", "POST, GET")
                next();
            })
        }
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': dev.env
        }),

        new ExtractTextPlugin({
            filename: utils.assetsPath('public/plugin/plugin/[name].css'),
            allChunks: true,
        }),

        new webpack.HotModuleReplacementPlugin(),

        // HMR shows correct file names in console on update.
        new webpack.NamedModulesPlugin(),

        new webpack.NoEmitOnErrorsPlugin(),

        new HtmlWebpackPlugin({
            filename: dev.index,
            template: 'index.html',
            chunks: ['plugin'],
            // inject: true
            inject: 'head'
        }),

        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../../static'),
            to: dev.assetsSubDirectory,
            ignore: ['.*']
        }]),

        // webpack打包过程中在CLI提示错误
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: http://${ServerHost}:${port}`],
            },
            onErrors: utils.createNotifierCallback()
        })
    ]
})

module.exports = devWebpackConfig
