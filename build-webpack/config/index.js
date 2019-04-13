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
        assetsPublicPath: '/weixin/',
        cacheBusting: true,
        jsSourceMap: true,
        cssSourceMap: true,
        env: {
            NODE_ENV: '"development"'
        }
    },

    build: {
        assetsRoot: resolve('../release/weixin'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '//cdn01.xiaogj.com/uploads/mobile/xgj/',
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
            target: 'http://test.xiaogj.com',
            changeOrigin: true,
        },
        '/weixin/teacher/Process.ashx': {
            target: 'http://test.xiaogj.com',
            changeOrigin: true,
        },
        '/weixin/parent/Process.ashx': {
            target: 'http://test.xiaogj.com',
            changeOrigin: true,
        },
        '/weixin/login.ashx': {
            target: 'http://test.xiaogj.com',
            changeOrigin: true,
        },
        '/99/api': {
            target: 'http://wone.xiaogj.com',
            changeOrigin: true,
            pathRewrite: {'^/99/api': '/api'}
        },
        '/99/weixin/teacher/Process.ashx': {
            target: 'http://wone.xiaogj.com',
            changeOrigin: true,
            pathRewrite: {'^/99/weixin/teacher/Process.ashx': '/weixin/teacher/Process.ashx'}
        }
    }
}