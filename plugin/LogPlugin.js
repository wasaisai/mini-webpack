/**
 * 执行顺序
   new Compiler()
     ↓
   plugin.apply(compiler)
     ↓
   compiler.run()
     ↓
   hooks.call()
     ↓
   plugin 注册的函数被执行
 */
class LogPlugin {
    apply(compiler) {
        compiler.hooks.run.tap('LogPlugin', () => {
            console.log('开始构建');
        });

        compiler.hooks.emit.tap('LogPlugin', (graph) => {
            console.log('构建完成，模块数量：', Object.keys(graph).length)
        });
    }
}

module.exports = LogPlugin;