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
        assetsSubDirectory: "static",
        assetsPublicPath: '/',
        cacheBusting: true,
        cacheBusting: true,
        jsSourceMap: true,
        cssSourceMap: true,
        env: {
            NODE_ENV: '"development"'
        }
    },

    build: {
        assetsRoot: resolve("../release/"),
        assetsSubDirectory: "static",
        assetsPublicPath: "https://cdn01.xiaogj.com/uploads/mobile/mzs/",
        // assetsPublicPath: "/",
        jsSourceMap: false,
        cssSourceMap: false,
        productionGzip: false,
        productionGzipExtensions: ["js", "css"],
        bundleAnalyzerReport: process.env.npm_config_report,
        env: {
            NODE_ENV: '"production"'
        }
    },

    proxy: {
        "/home": {
            target: "http://trialapply.xrx100.com",
            changeOrigin: true
        },
        "/weixin/teacher/Process.ashx": {
            target: "http://test.xiaogj.com",
            changeOrigin: true
        },
        "/weixin/parent/Process.ashx": {
            target: "http://test.xiaogj.com",
            changeOrigin: true
        },
        "/weixin/login.ashx": {
            target: "http://test.xiaogj.com",
            changeOrigin: true
        },
        
        "/99/weixin/teacher/Process.ashx": {
            target: "http://wone.xiaogj.com",
            changeOrigin: true,
            pathRewrite: {
                "^/99/weixin/teacher/Process.ashx":
                    "/weixin/teacher/Process.ashx"
            }
        },
        "/lqy": {
            
            target: "http://10.0.0.158:811",
            changeOrigin: true,
            pathRewrite: { "^/lqy": "" }
        },
        "/zzy": {
            target: "http://10.0.0.137:8084",
            changeOrigin: true,
            pathRewrite: { "^/zzy": "" }
        },
        "/py": {
            target: "http://10.0.0.120:808",
            changeOrigin: true,
            pathRewrite: { "^/py": "" }
        },
        "/zw": {
            target: "http://10.0.0.125:1555",
            changeOrigin: true,
            pathRewrite: { "^/zw": "" }
        },
        "/czf": {
            target: "http://10.0.0.152:9001",
            changeOrigin: true,
            pathRewrite: { "^/czf": "" }
        },
        "/xs": {
            target: "http://10.0.0.149:999",
            changeOrigin: true,
            pathRewrite: { "^/xs": "" }
        },
    }
};
