
const runtimeFn = require('./runtimeTemplate');

function createRuntime(entry) { 
    return `
        (${runtimeFn.toString()})(modules, '${entry}')
    `;
}

module.exports = { createRuntime }
