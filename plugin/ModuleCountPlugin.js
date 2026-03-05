class ModuleCountPlugin {
    apply(compiler) {
        compiler.hooks.afterCompile.tap('ModuleCountPlugin', (graph) => {
            console.log('模块数量：', Object.keys(graph).length)
        });
    }
}

module.exports = ModuleCountPlugin;