'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const config = require('../config')
var dev = config.dev
var proxys = config.proxy

var sourceMap = {
    "sourceMap": dev.cssSourceMap
}
var port = 9002
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


var httpsEnable = false


const devWebpackConfig = merge(baseWebpackConfig, {
    output: {
        filename: utils.assetsPath('js/[name].js'),
        chunkFilename: utils.assetsPath('js/[name].js'),
        publicPath: dev.assetsPublicPath
    },

    module: {
        rules: [{
            "test": /\.css$/,
            "use": [
                "vue-style-loader", {
                    "loader": "css-loader",
                    "options": sourceMap
                }, {
                    "loader": "postcss-loader",
                    "options": sourceMap
                }
            ]
        }, {
            "test": /\.scss$/,
            "use": [
                "vue-style-loader", {
                    "loader": "css-loader",
                    "options": sourceMap
                }, {
                    "loader": "postcss-loader",
                    "options": sourceMap
                }, {
                    "loader": "sass-loader",
                    "options": sourceMap
                }
            ]
        }]
    },

    devtool: dev.jsSourceMap ? 'cheap-module-eval-source-map' : false,

    devServer: {
        clientLogLevel: 'warning',
        hot: true,
        // contentBase: false,
        contentBase: config.resolve("../release"),
        compress: true,
        https: httpsEnable,
        host: '0.0.0.0',
        port: port,
        disableHostCheck: true,
        open: true,
        // openPage: 'weixin/parent/index.html',
        openPage: '',
        overlay: true,
        // publicPath: dev.assetsPublicPath,
        proxy: proxys,
        quiet: true, // necessary for FriendlyErrorsPlugin
        inline: true,
        public: `${ServerHost}:${port}`,
        progress: true
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': dev.env
        }),
        new webpack.HotModuleReplacementPlugin(),

        // HMR shows correct file names in console on update.
        new webpack.NamedModulesPlugin(),

        new webpack.NoEmitOnErrorsPlugin(),


        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/app/mall/index.html',
            chunks: ['mall'],
            inject: true
        }),
        /*new HtmlWebpackPlugin({
            filename: 'share.html',
            template: './src/app/share/index.html',
            chunks: ['share'],
            inject: true
        }),*/

        // new CopyWebpackPlugin([{
        //     from: path.resolve(__dirname, '../../static/share'),
        //     to: './share',
        //     ignore: ['.*']
        // }]),

        // webpack打包过程中在CLI提示错误
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: ${httpsEnable? 'https' : 'http'}://${ServerHost}:${port}`],
            },
            onErrors: utils.createNotifierCallback()
        })
    ]
})

module.exports = devWebpackConfig