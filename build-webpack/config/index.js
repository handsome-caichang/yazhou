'use strict'

const path = require('path')

function resolve(dir) {
    return dir 
        ? path.resolve(__dirname, '../../release', dir) 
        : path.resolve(__dirname, '../../release')
}

module.exports = {
    resolve: resolve,
    
    dev: {
        index: resolve('index.html'),
        assetsRoot: resolve(),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/im/html/',

        cacheBusting: true,

        jsSourceMap: true,
        cssSourceMap: true,

        env: {
            NODE_ENV: '"development"'
        }
    },

    build: {
        index: resolve('index.html'),
        assetsRoot: resolve(),
        assetsSubDirectory: 'static',
        // assetsPublicPath: '/im/html/',        
        assetsPublicPath: '//cdn01.xiaogj.com/uploads/mobile/im/',

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
            target: 'https://imdevp.xiaogj.com',
            changeOrigin: true,
        },
        '/user': {
            target: 'https://imdevp.xiaogj.com',
            changeOrigin: true,
        },
        '/imdevp/api': {
            target: 'https://imdevp.xiaogj.com',
            changeOrigin: true,
            pathRewrite: {'^/imdevp/api': '/api'}
        },
        '/imdevp/user': {
            target: 'https://imdevp.xiaogj.com',
            changeOrigin: true,
            pathRewrite: {'^/imdevp/user': '/user'}
        },
        '/im/api': {
            target: 'https://im.xiaogj.com',
            changeOrigin: true,
            pathRewrite: {'^/im/api': '/api'}
        },
        '/im/user': {
            target: 'https://im.xiaogj.com',
            changeOrigin: true,
            pathRewrite: {'^/im/user': '/user'}
        },
    }
}