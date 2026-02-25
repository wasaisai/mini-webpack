const path = require('path');
const Compiler = require('./lib/compiler');
const LogPlugin = require('./plugin/LogPlugin');

const compiler = new Compiler({
    entry: './src/index.js',
    output: {
        path: './dist',
        filename: 'bundle.js'
    },
    plugins: [
        new LogPlugin(),
    ]
});

compiler.run();