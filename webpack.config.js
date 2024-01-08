const path = require("path");
const webpack = require('webpack');
const nodeExternals = require("webpack-node-externals");
const TerserPlugin = require("terser-webpack-plugin");

require('dotenv').config();
console.log('API Key:', process.env.RANDOM_IMAGE_API_KEY);  // For testing purposes


module.exports = [{
    mode: "production",
    target: "web",
    entry: "./index.js",
    output: {
        filename: "ContentGenerator.amd.js",
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
                    presets: [["@babel/preset-env", {
                        targets: {
                            browsers: ["last 5 versions", "safari >= 7"]
                        },
                        modules: "amd"
                    },],]
                }
            }
        },]
    },
    plugins: [
        new webpack.DefinePlugin({'process.env.RANDOM_IMAGE_API_KEY': JSON.stringify(process.env.RANDOM_IMAGE_API_KEY)}),
        new webpack.ProvidePlugin({process: 'process/browser'})
    ],
}, {
    mode: "production",
    target: "node",
    entry: "./index.js",
    output: {
        filename: "ContentGenerator.js",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "commonjs2"
    },
    devtool: 'source-map',
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
                    presets: [["@babel/preset-env", {
                        targets: {
                            node: "current"
                        },
                        modules: "commonjs"
                    },],]
                }
            }
        },]
    },
    externals: [nodeExternals()]
}];
