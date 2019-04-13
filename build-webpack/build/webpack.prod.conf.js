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

var sourceMap = { "sourceMap": build.cssSourceMap }

const webpackConfig = merge(baseWebpackConfig, {
    output: {
        path: build.assetsRoot,
        filename: utils.assetsPath('public/plugin/plugin/[name].js'),
        chunkFilename: utils.assetsPath('public/plugin/plugin/[name].js'),
        publicPath: build.assetsPublicPath
    },

    module: {
        rules: utils.styleLoaders({
            sourceMap: build.cssSourceMap,
            extract: true,
            usePostCSS: true
        }).concat([
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    limit: 50000,
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
                loader: 'file-loader',
                options: {
                    limit: 50000,
                    name: utils.assetsPath('public/plugin/assets/fonts/[name].[hash:7].[ext]')
                }
            }
        ])
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
            filename: utils.assetsPath('public/plugin/plugin/[name].css'),
            allChunks: true,
        }),

        new OptimizeCSSPlugin({
            cssProcessorOptions: build.cssSourceMap ?
                {
                    safe: true,
                    map: {
                        inline: false
                    }
                } :
                {
                    safe: true
                }
        }),

        new webpack.HashedModuleIdsPlugin(),

        new webpack.optimize.ModuleConcatenationPlugin(),

        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../../static'),
            to: build.assetsSubDirectory,
            ignore: ['.*']
        }])
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