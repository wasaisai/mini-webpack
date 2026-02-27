const path = require('path');
const LogPlugin = require('./plugin/LogPlugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new LogPlugin(),
    ]
}