
const path=require('path');
const merge = require('webpack-merge').default;
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
      },
});