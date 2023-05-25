const HtmlWebpackPlugin = require('html-webpack-plugin');
const ContextReplacementPlugin = require('context-replacement-plugin');
const supportedLocales = require('./datefns-config.js');
const path = require('path');

 module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devServer: {
        static: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'To-Do-List',
        }),
        new ContextReplacementPlugin(
            /^date-fns[/\\]locale$/,
            new RegExp(`\\.[/\\\\](${supportedLocales.join('|')})[/\\\\]index\\.js$`)
        ),
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
        },
        ],
    },
 };