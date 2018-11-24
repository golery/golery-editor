const path = require('path');
const webpack = require("webpack");
module.exports = {
    entry: "./src/sandbox/index.js",
    output: {
        path: __dirname + "/",
        publicPath: "/",
        filename: "bundle.js"
    },
    devtool: "eval-source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "less-loader"
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"],
        alias: {
            // have shorter list of language for prism
            "prismjs/components.json":  path.resolve(__dirname, 'src/components/codeblock/prism/components.json')
        }
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devServer: {
        contentBase: path.resolve(__dirname, 'src', 'sandbox'),
        hot: true
    }
};
