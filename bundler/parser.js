// AST解析

const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

function parseModule(filename) {
    const content = fs.readFileSync(filename, 'utf-8');

    const ast = parser.parse(content, {
        sourceType: 'module'
    });

    const dependencies = [];

    traverse(ast, {
        ImportDeclaration({ node }) {
            dependencies.push(node.source.value);
        },
    })

    return {
        filename,
        dependencies,
    }

}

module.exports = { parseModule }