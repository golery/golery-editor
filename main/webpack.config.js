const path = require('path');
const config = {
    entry: "./src/index.js",
    output: {
        path: __dirname + "/dist",
        filename: "index.js",
        publicPath: "/",
        library: 'GoleryEditor',
        libraryTarget: 'umd',
        // https://github.com/webpack/webpack/issues/6784
        globalObject: 'typeof self !== \'undefined\' ? self : this'
    },
    devtool: "source-map",
    externals: {
        "react": "react",
        "react-dom": "react-dom",
        "react-dom/server": "react-dom/server",
        "lodash": "lodash",
        "moment": "moment"
    },
    module: {
        rules: [
            {
                test: /(\.ts?|\.js?)$/,
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
                test: /\.module.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: true
                        }
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    }
};

module.exports = function (env, argv) {
    if (argv.mode === "production") {
        config.output.filename = "index.js";
        config.output.path += "/min";
        config.devtool = "source-map";
    } else {
        config.output.filename = "index.js";
        config.output.path += "/dev";
        config.devtool = "eval-source-map";
    }
    console.log(config);
    return config;
};