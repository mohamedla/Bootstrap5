// webpack.config.js

const path = require("path");
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    // Entry and output
    entry: "./src/index.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        // libraryTarget: 'var',
        // library: 'EntryPoint'
    },

    // Loaders
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
        ]
    },

    // Plugins
    plugins: [],

    // Configs
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },

    //devtool: "source-map",

    optimization: {
        mangleExports: false,
        moduleIds: 'named',

        // Minify in production
        minimize: true,
        minimizer: [
            new TerserPlugin(
                {
                    terserOptions : {
                        mangle: false
                    }
                }
            ),
        ]
    }
};
