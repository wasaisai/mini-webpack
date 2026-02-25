const {createRuntime} = require('./runtime')

function createModules(graph) {
    return JSON.stringify(
        Object.fromEntries(
            Object.entries(graph).map(([id, info]) => [
                id,
                {
                    dependenciese: info.dependenciese,
                    fn: info.code
                }
            ])
        )
    )
}




function generateBundle(graph, entry) {
    const modulesCode = createModules(graph);
    const runtimeCall = createRuntime(entry);

    /**
     * 立即执行函数，避免污染全局作用域
     * catch：模块缓存：通过cache缓存exports，第二次直接返回
     */
    return `
        (function() {
            const modules = ${modulesCode};
            ${runtimeCall}
        })()
    `
}

module.exports = { generateBundle };