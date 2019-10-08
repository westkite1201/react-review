const path =  require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    devtool: 'source-map',
    entry: {
        main: './app.js'
    },
    output: {
        filename: 'bundle.js',
        path: __dirname + '/public/bundle'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                    options:{
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    node: {
        fs:'empty',
        net: 'empty',
    },
    target: 'node',
    externals:[nodeExternals()],
    mode: 'development'
}