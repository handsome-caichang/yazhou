'use strict'
const path = require('path')
const utils = require('./utils')
const vueLoaderConfig = require('./vue-loader.conf')
var vuxLoader = require('vux-loader')

function resolve(dir) {
    // return path.join(__dirname, '../..', dir)
    return dir 
        ? path.resolve(__dirname, '../..', dir) 
        : path.resolve(__dirname, '../..')
}


var webpackConfig = {
    context: resolve(),
    
    entry: {
        plugin: './src/plugin/index.js'
    },

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
            'src': resolve('src'),
            'vender': resolve('static/vender')
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
        },/* {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'file-loader',
            options: {
                limit: 1,
                name: utils.assetsPath('public/plugin/assets/img/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'file-loader',
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
        }*/]
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

module.exports = vuxLoader.merge(webpackConfig, {
    plugins: ['vux-ui']
})