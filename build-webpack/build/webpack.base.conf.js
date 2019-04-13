'use strict'

module.exports = env => {
    console.log("base => ", env);
    const path = require('path')
    const utils = require('./utils')
    const vueLoaderConfig = require('./vue-loader.conf')

    function resolve(dir) {
        return dir ?
            path.resolve(__dirname, '../..', dir) :
            path.resolve(__dirname, '../..')
    }

    function getEntry(pro) {
        var entry = {
            parent: './src/app/parent/main.js',
            parentShare: './src/app/parent-share/main.js',
            teacher: './src/app/teacher/main.js',
            // teacherShare: './src/app/teacher-share/main.js',
            dailyReport: './src/app/daily-report/main.js',
            weekReport:'./src/app/daily-report/week-main.js'
        }

        if (pro === 'all') {
            return entry
        } else {
            var o = {}
            o[pro] = entry[pro]
            return o
        }
    }

    var baseWebpackConfig = {
        context: resolve(),

        entry: getEntry(env.pro),

        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                'common': resolve('src/common'),
                'parent': resolve('src/app/parent'),
                'parentShare': resolve('src/app/parent-share'),
                'teacher': resolve('src/app/teacher'),
                // 'teacherShare': resolve('src/app/teacher-share'),
                'dailyReport': resolve('src/app/daily-report')
            }
        },
        module: {
            rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            }, {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }]
        },
        node: {
            // prevent webpack from injecting useless setImmediate polyfill because Vue
            // source contains it (although only uses it if it's native).
            setImmediate: false,
            // prevent webpack from injecting mocks to Node native modules
            // that does not make sense for the client
            dgram: 'empty',
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
            child_process: 'empty'
        }
    }

    return baseWebpackConfig
}