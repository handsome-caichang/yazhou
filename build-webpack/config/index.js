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
        assetsPublicPath: '/winxin/crm/',

        cacheBusting: true,

        jsSourceMap: true,
        cssSourceMap: true,

        env: {
            NODE_ENV: '"development"'
        }
    },

    build: {
        assetsRoot: resolve('../release/winxin/crm'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/winxin/crm/',
        // assetsPublicPath: '//cdn01.xiaogj.com/uploads/mobile/crm/',

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
        '/wx.do': {
            target: 'https://smarttest.xiaogj.com',
            // target: 'http://10.0.0.101:10000',
            changeOrigin: true,
            // pathRewrite: {'^/101/wx.do': '/wx.do'}
        },
        '/101/wx.do': {
            target: 'http://10.0.0.101:10000',
            changeOrigin: true,
            pathRewrite: {
                '^/101/wx.do': '/wx.do'
            }
        }
    }
}