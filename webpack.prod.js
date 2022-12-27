const merge=require('webpack-merge').default;
const common=require('./webpack.common');
const path=require('path');

const TerserPlugin=require('terser-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "index.js",
    },
    optimization:{
        minimize:true,
        minimizer:[
            new TerserPlugin({
                terserOptions:{
                    compress:{
                        drop_console:true
                    }
                }
            })
        ]
    }
})
