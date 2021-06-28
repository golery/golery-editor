const path = require('path');
const webpack = require("webpack");
module.exports = {
    entry: "./src/sandbox/index.tsx",
    output: {
        path: __dirname + "/",
        publicPath: "/",
        filename: "bundle.js"
    },
    devtool: "eval-source-map",
    module: {
        rules: [
            {
                test: /.ts|.tsx|.js|.jsx/,
                use: 'ts-loader',
                exclude: /node_modules/,
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
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devServer: {
        contentBase: path.resolve(__dirname, 'src', 'sandbox'),
        hot: true,
        port: 9000
    }
};
