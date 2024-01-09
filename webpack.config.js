const path = require("path");
const webpack = require('webpack');
const nodeExternals = require("webpack-node-externals");
const TerserPlugin = require("terser-webpack-plugin");

require('dotenv').config();

module.exports = [{
    mode: "production",
    target: "web",
    entry: "./index.js",
    output: {
        filename: "RandomUtil.amd.js",
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            extractComments: false,
        })]
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: [
                        ["@babel/preset-env", {
                            targets: {
                                browsers: ["last 5 versions", "safari >= 7"]
                            },
                            modules: "amd"
                        }, ],
                    ]
                }
            }
        }, ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.UNSPLASH_API_KEY': JSON.stringify(process.env.UNSPLASH_API_KEY)
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser'
        })
    ],
}, {
    mode: "production",
    target: "node",
    entry: "./index.js",
    output: {
        filename: "RandomUtil.js",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "commonjs2"
    },
    // devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: [
                        ["@babel/preset-env", {
                            targets: {
                                node: "current"
                            },
                            modules: "commonjs"
                        }, ],
                    ]
                }
            }
        }, ]
    },
    externals: [nodeExternals()]
}];