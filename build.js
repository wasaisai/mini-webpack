const Compiler = require('./lib/compiler');
const config = require('./mini.config.js');

const compiler = new Compiler(config);

compiler.run();