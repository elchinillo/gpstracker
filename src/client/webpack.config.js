const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const PUBLIC_PATH = '/assets/';

module.exports = {
    context: __dirname,
    entry: {
        'csv-worker': './src/csv-worker.js',
        'ecirgas-client': './src/client.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            modules: true,
                            sourceMap: true
                        }
                    }
                })
            },
            {
                test: /node_modules\/.+\.css$/,
                use: ExtractTextPlugin.extract({
                    use: {
                        loader: 'css-loader',
                        options: {
                            minimize: false,
                            sourceMap: false
                        }
                    }
                })
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.png$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: PUBLIC_PATH
                        }
                    }
                ]
            }
        ]
    },
    output: {
        path: path.join(__dirname, 'dist/assets/') ,
        filename: '[name].js',
        publicPath: PUBLIC_PATH
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new CopyWebpackPlugin(
            [
                {
                    context: path.join(__dirname, 'src/static'),
                    from: 'index.html',
                    to: path.join(__dirname, 'dist/')
                }
            ]
        ),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new UglifyJSPlugin({
            uglifyOptions: {
                ecma: 6
            }
        })
    ],
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    },
    target: 'web'
};
