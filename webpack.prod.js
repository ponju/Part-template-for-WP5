const merge=require('webpack-merge').default;
const common=require('./webpack.common');

module.exports = merge(common, {
    mode: 'production',
})
