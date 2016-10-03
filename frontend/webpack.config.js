const webpack = require('webpack');
const path = require("path");
module.exports = {
    entry: {
        app: ["./src/main.js"]
    },
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/assets/js/",
        filename: "bundle.js"
    },
    // output: {
    //     path: "./assets/js/",
    //     filename: "bundle.js"
    // },
    devtool:"cheap-module-eval-source-map",
    //devServer: { inline: true },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        })
    ],
    externals: {
        jquery: 'window.$'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['stage-3']
                }
            }
        ]
    },
    babel: {
        presets: ['stage-3']
    }
};
