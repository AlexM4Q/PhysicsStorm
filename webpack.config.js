const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const outputDirectory = "build";

module.exports = {
    entry: "./src/client/index.tsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, outputDirectory)
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        modules: [
            path.resolve(__dirname, './src'),
            path.resolve(__dirname, './node_modules'),
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts|\.tsx?$/,
                exclude: path.resolve(__dirname, './node_modules'),
                loaders: ["babel-loader", "ts-loader"]
            },
            {
                test: /\.css$/,
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
        // new CleanWebpackPlugin([outputDirectory]),
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