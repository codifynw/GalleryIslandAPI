const path = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// const CircularDependencyPlugin = require('circular-dependency-plugin')
// const core_path = path.resolve(__dirname, './../../../source_framework/static/js/modules/');
// const module_path = path.resolve(__dirname, './../../../source_framework/static/js/source/');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    // mode: 'development',
    entry: {
        main: [
            './app/core/static/core/js/main.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'app/core/static/core/dist/js/'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                            removeComments: false,
                            collapseWhitespace: false
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'img/',
                        publicPath: '../static/__dist/img/',
                        useRelativePaths: true
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery',
            Mustache: 'mustache',
        })
        // new BundleAnalyzerPlugin()
    ],
    // devServer: {
    //     contentBase: path.join(__dirname, 'dist'),
    //     publicPath: '/dist',
    //     compress: true,
    //     port: 9000,
    //     stats: 'errors-only'
    // }
    // devtool: 'inline-source-map'
};
