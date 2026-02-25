// AST解析

const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');
const generator = require('@babel/generator').default;

function parseModule(content, filePath) {

    const ast = parser.parse(content, {
        sourceType: 'module'
    });

    const dependencies = {};

    traverse(ast, {
        ImportDeclaration({ node }) {
            const dirname = require('path').dirname(filePath);
            const absolutePath = require('path').resolve(
                dirname,
                node.source.value
            )
            dependencies[node.source.value] = absolutePath;
        },
    });
    // ES Module 转成 CommonJS。
    // webpack运行在node环境，最终通过自定义require执行模块，所以需要统一成CommonJS形式
    // const { code } = babel.transformFromAstAsync(ast, null, {
    //     presets: ['@babel/preset-env']
    // });


    const { code } = generator(ast);

    return {
        // filename,
        dependencies,
        code,
    }

}

module.exports = { parseModule }