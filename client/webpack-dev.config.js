const FlowWebpackPlugin = require('flow-webpack-plugin');
const path = require('path');

const config = require('./webpack.config');

config.devServer = {
    contentBase: path.join(__dirname, 'src/static/'),
    overlay: {
        warnings: false,
        errors: true
    },
    watchContentBase: true
};

config.devtool = 'eval-source-map';

config.plugins = config.plugins.slice(0, 1).concat([
    new FlowWebpackPlugin()
]);

module.exports = config;
