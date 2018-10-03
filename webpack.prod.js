const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const sourceDirectory = path.resolve(__dirname, "source");
const outputDirectory = path.resolve(__dirname, "build");
const nodeModulesDirectory = path.resolve(__dirname, "node_modules");

module.exports = merge(common, {
    mode: "production",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    plugins: [
        new UglifyJsPlugin({
            include: outputDirectory,
            exclude: [
                sourceDirectory,
                nodeModulesDirectory
            ],
            cache: true,
            parallel: true,
            sourceMap: false
        }),
        new OptimizeCSSAssetsPlugin({}),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        })
    ],
});