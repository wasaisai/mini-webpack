const path = require('path');
const LogPlugin = require('./plugin/LogPlugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    rules: [
        {
            test: /\.css$/,
            use: [
                './loader/style-loader.js',
                './loader/css-loader.js',
            ],
        },
    ],
    plugins: [
        new LogPlugin(),
    ]
}