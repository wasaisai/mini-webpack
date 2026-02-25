// AST解析

const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

const path = require('path');

function applyLoaders(filename, source, rules) {
    let code = source;

    rules.forEach(rule => {
        if (rule.test.test(filename)) {
            rule.use.forEach(loader => {
                code = loader(code)
            })
        }
    })

    return code;
}

function parseModule(filename, rules = []) {
    let content = fs.readFileSync(filename, 'utf-8');
    content = applyLoaders(filename, content, rules);

    const ast = parser.parse(content, {
        sourceType: 'module'
    });

    const dependencies = [];

    traverse(ast, {
        ImportDeclaration({ node }) {
            dependencies.push(node.source.value);
        },
    });
    
    // ES Module 转成 CommonJS。
    // webpack运行在node环境，最终通过自定义require执行模块，所以需要统一成CommonJS形式
    const { code } = babel.transformFromAstAsync(ast, null, {
        presets: ['@babel/preset-env']
    })

    return {
        filename,
        dependencies,
        code,
    }

}

module.exports = { parseModule }