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
        
        // 代理到 WX后端同事
        // 罗青云 10.0.0.158:830
        // 贺创 10.0.0.130:809
        // 彭勇 10.0.0.120:8086
        // 谭磊 10.0.0.123:8085
        // 陈钊锋 10.0.0.152:8989
        // 谢帅  10.0.0.149:888
        // 钟威 10.0.0.125:1212
        // 杨小星  10.0.0.167:8035
        // 周泽亚  10.0.0.137:8083
        // 贺兵 10.0.0.108:8100
        "/lqy": {
            target: "http://10.0.0.158:830",
            changeOrigin: true,
            pathRewrite: { "^/lqy": "" }
        },
        "/hc": {
            target: "http://10.0.0.130:809",
            changeOrigin: true,
            pathRewrite: { "^/hc": "" }
        },
        "/py": {
            target: "http://10.0.0.120:8086",
            changeOrigin: true,
            pathRewrite: { "^/py": "" }
        },
        "/tl": {
            target: "http://10.0.0.123:8085",
            changeOrigin: true,
            pathRewrite: { "^/tl": "" }
        },
        "/czf": {
            target: "http://10.0.0.152:8989",
            changeOrigin: true,
            pathRewrite: { "^/czf": "" }
        },
        "/xs": {
            target: "http://10.0.0.149:888",
            changeOrigin: true,
            pathRewrite: { "^/xs": "" }
        },
        "/zw": {
            target: "http://10.0.0.125:1212",
            changeOrigin: true,
            pathRewrite: { "^/zw": "" }
        },
        "/cxx": {
            target: "http://10.0.0.167:8035",
            changeOrigin: true,
            pathRewrite: { "^/cxx": "" }
        },
        "/zzy": {
            target: "http://10.0.0.137:8083",
            changeOrigin: true,
            pathRewrite: { "^/zzy": "" }
        },
        "/hb": {
            target: "http://10.0.0.108:8100",
            changeOrigin: true,
            pathRewrite: { "^/hb": "" }
        },

        // 代理到'mock'环境
        "/mock": {
            target: "http://10.0.0.30:8001",
            changeOrigin: true,
            pathRewrite: { "^/mock": "" }
        },


        // wone环境, 暂时有用， wx联调完成后便无用了
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
        // '/99/api': {
        //     target: 'http://test.xiaogj.com',
        //     changeOrigin: true,
        //     pathRewrite: {'^/99/api': '/api'}
        // },
        // '/99/weixin/teacher/Process.ashx': {
        //     target: 'http://test.xiaogj.com',
        //     changeOrigin: true,
        //     pathRewrite: {'^/99/weixin/teacher/Process.ashx': '/weixin/teacher/Process.ashx'}
        // },
        // '/99/weixin/parent/Process.ashx': {
        //     target: 'http://test.xiaogj.com',
        //     changeOrigin: true,
        //     pathRewrite: {'^/99/weixin/parent/Process.ashx': '/weixin/parent/Process.ashx'}
        // }

    }
}