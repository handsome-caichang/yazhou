'use strict'


// module.exports = devWebpackConfig

module.exports = env => {
    console.log("dev => ", env);

    const utils = require('./utils')
    const webpack = require('webpack')
    const merge = require('webpack-merge')
    const path = require('path')
    const baseWebpackConfig = require('./webpack.base.conf')(env)
    const CopyWebpackPlugin = require('copy-webpack-plugin')
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

    const config = require('../config')
    var dev = config.dev
    var proxys = config.proxy

    var sourceMap = {
        "sourceMap": dev.cssSourceMap
    }
    var port = 1099
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


    var httpsEnable = true


    function getHtmlArr(pro) {
        var arr = [], 
            obj = {
                parent: new HtmlWebpackPlugin({
                    filename: 'parent/index.html',
                    template: './src/app/parent/index.html',
                    chunks: ['parent'],
                    inject: true
                }),
                parentShare: new HtmlWebpackPlugin({
                    filename: 'parent/share.html',
                    template: './src/app/parent-share/index.html',
                    chunks: ['parentShare'],
                    inject: true
                }),
                teacher: new HtmlWebpackPlugin({
                    filename: 'teacher/index.html',
                    template: './src/app/teacher/index.html',
                    chunks: ['teacher'],
                    inject: true
                }),
                /*teacherShare: new HtmlWebpackPlugin({
                    filename: 'teacher/share.html',
                    template: './src/app/teacher-share/index.html',
                    chunks: ['teacherShare'],
                    inject: true
                }),*/
                dailyReport: new HtmlWebpackPlugin({
                    filename: 'teacher/daily_report.html',
                    template: './src/app/daily-report/daily_report.html',
                    chunks: ['dailyReport'],
                    inject: true
                }),
                weekReport: new HtmlWebpackPlugin({
                    filename: 'teacher/week_report.html',
                    template: './src/app/daily-report/week_report.html',
                    chunks: ['weekReport'],
                    inject: true
                })
            }

        console.log(pro);

        if (pro === 'all') {
            for (var key in obj) {
                arr.push(obj[key])
            }
        } else {
            arr.push(obj[pro])
        }
        return arr
    }


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
            contentBase: [config.resolve("../release"),config.resolve("../release-old")],
            compress: true,
            https: httpsEnable,
            host: '0.0.0.0',
            port: port,
            disableHostCheck: true,
            open: true,
            openPage: '',
            overlay: true,
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

            new webpack.NamedModulesPlugin(),

            new webpack.NoEmitOnErrorsPlugin(),

            ...getHtmlArr(env.pro),

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

    return devWebpackConfig
}