const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const sourceDirectory = path.resolve(__dirname, "source");
const outputDirectory = path.resolve(__dirname, "build");
const nodeModulesDirectory = path.resolve(__dirname, "node_modules");

module.exports = {
    entry: "./src/client/index.tsx",
    output: {
        filename: "bundle.js",
        path: outputDirectory
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        modules: [
            sourceDirectory,
            nodeModulesDirectory,
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts|\.tsx?$/,
                exclude: nodeModulesDirectory,
                use: ["babel-loader"]
            },
            {
                test: /\.js$/,
                enforce: "pre",
                exclude: nodeModulesDirectory,
                use: ["source-map-loader"]
            },
            {
                test: /\.css$/,
                exclude: nodeModulesDirectory,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    devtool: "inline-source-map",
    devServer: {
        port: 3000,
        open: true,
        proxy: {
            "/api": "http://localhost:8080"
        }
    },
    plugins: [
        new CleanWebpackPlugin(outputDirectory),
        new UglifyJsPlugin({
            include: outputDirectory,
            exclude: [
                sourceDirectory,
                nodeModulesDirectory
            ],
            parallel: true,
            sourceMap: true
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            favicon: "./public/favicon.ico"
        })
    ],
    target: "web",
    node: {
        fs: "empty"
    }
};