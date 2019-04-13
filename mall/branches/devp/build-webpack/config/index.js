'use strict'

const path = require('path')

function resolve(dir) {
    return dir ?
        path.resolve(__dirname, '../../release', dir) :
        path.resolve(__dirname, '../../release')
}

module.exports = {
    resolve: resolve,

    dev: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '',

        cacheBusting: true,

        jsSourceMap: true,
        cssSourceMap: true,

        env: {
            NODE_ENV: '"development"'
        }
    },

    build: {
        assetsRoot: resolve('../release/'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '',
        // assetsPublicPath: '//cdn01.xiaogj.com/uploads/mobile/mall/',

        jsSourceMap: false,
        cssSourceMap: false,

        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        bundleAnalyzerReport: process.env.npm_config_report,

        env: {
            NODE_ENV: '"production"'
        }
    },

    proxy: {
        '/api': {
            target: 'https://mall.xiaogj.com/test',
            changeOrigin: true,
        },
        '/workwx.do': {
            target: 'https://smarttest.xiaogj.com',
            changeOrigin: true
        },
    }
}