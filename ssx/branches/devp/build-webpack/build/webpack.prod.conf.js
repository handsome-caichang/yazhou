'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const build = require('../config').build

var sourceMap = {
    "sourceMap": build.cssSourceMap
}

const webpackConfig = merge(baseWebpackConfig, {
    output: {
        path: build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[name].[id].[chunkhash].js'),
        publicPath: build.assetsPublicPath
    },

    module: {
        rules: [{
            "test": /\.css$/,
            "use": ExtractTextPlugin.extract({
                "fallback": 'vue-style-loader',
                "use": [{
                    "loader": 'css-loader',
                    "options": sourceMap
                }, {
                    "loader": 'postcss-loader',
                    "options": sourceMap
                }]
            })
        }, {
            "test": /\.scss$/,
            "use": ExtractTextPlugin.extract({
                "fallback": 'vue-style-loader',
                "use": [{
                    "loader": 'css-loader',
                    "options": sourceMap
                }, {
                    "loader": 'postcss-loader',
                    "options": sourceMap
                }, {
                    "loader": "sass-loader",
                    "options": sourceMap
                }]
            })
        }]
    },

    devtool: build.jsSourceMap ? '#source-map' : false,

    plugins: [
        new webpack.DefinePlugin({
            'process.env': build.env
        }),

        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            sourceMap: build.jsSourceMap,
            parallel: true
        }),

        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css'),
            allChunks: true,
        }),

        new OptimizeCSSPlugin({
            cssProcessorOptions: build.cssSourceMap ? {
                safe: true,
                map: {
                    inline: false
                }
            } : {
                safe: true
            }
        }),

        new HtmlWebpackPlugin({
            filename: 'parent_smart/index.html',
            template: './src/app/parent/index.html',
            chunks: ['parent'],
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                minifyCSS: true,
                minifyJS: true
            },
            chunksSortMode: 'dependency'
        }),
      
        new HtmlWebpackPlugin({
            filename: 'teacher_smart/index.html',
            template: './src/app/teacher/index.html',
            chunks: ['teacher'],
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                minifyCSS: true,
                minifyJS: true
            },
            chunksSortMode: 'dependency'
        }),
        
        new webpack.HashedModuleIdsPlugin(),

        new webpack.optimize.ModuleConcatenationPlugin(),


        new webpack.optimize.CommonsChunkPlugin({
            name: 'app',
            async: 'vendor-async',
            children: true,
            minChunks: 3
        })
    ]
})

if (build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

if (build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig