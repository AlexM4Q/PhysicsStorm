const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

const nodeModulesDirectory = path.resolve(__dirname, "node_modules");

module.exports = merge(common, {
    mode: "development",
    module: {
        rules: [
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
});