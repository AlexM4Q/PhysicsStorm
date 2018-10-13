const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
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
                test: /\.tsx?$/,
                exclude: nodeModulesDirectory,
                loader: "babel-loader"
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                enforce: "pre",
                loader: "image-webpack-loader",
                options: {
                    bypassOnDebug: true
                }
            },
            {
                test: /\.svg$/,
                loader: "svg-url-loader",
                options: {
                    limit: 10 * 1024,
                    noquotes: true,
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(outputDirectory),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            favicon: "./public/favicon.ico",
            minify: {
                removeComments: true,
                removeCommentsFromCDATA: true,
                removeCDATASectionsFromCDATA: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeEmptyAttributes: true
            }
        })
    ],
    target: "web",
    node: {
        fs: "empty"
    }
};