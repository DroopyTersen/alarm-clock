var fs = require("fs");
var path = require("path");

module.exports = {
    entry: { "site": "./entries/site.js" },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js",
        sourceMapFilename: "[name].js.map"
    },
    module: {
        loaders: [
            addBabelLoader() //Enable writing ES6 javascript
        ]
    },
    devtool: "source-map"
};


// Transpile all js files to ES5
function addBabelLoader() {
    return {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
            presets: ['es2015'],
        }
    };
}
