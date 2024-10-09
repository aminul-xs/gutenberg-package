const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                            process.env.NODE_ENV === 'development' && 'react-refresh/babel'
                        ].filter(Boolean),
                    },
                },
            },
        ],
    },
    plugins: [
        process.env.NODE_ENV === 'development' && new ReactRefreshWebpackPlugin()
    ].filter(Boolean),
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    optimization: {
        usedExports: true, // Enable tree shaking
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'lib'),
        },
        hot: true, // Enable hot module replacement
    },
};