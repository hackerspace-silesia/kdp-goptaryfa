const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: "./src/main.ts",
    output: {
        filename: "bundle.js",
        path: __dirname + "/../dist"
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts"],
        modules: ['node_modules']

    },

    module: {
        rules: [
            { 
              test: /\.ts$/, 
              loader: "awesome-typescript-loader"
            },
            { 
              enforce: "pre", 
              test: /\.js$/, 
              loader: "source-map-loader" 
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin()
    ]
};
