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
            console.log('🚀 编译开始');
        });

        compiler.hooks.emit.tap('LogPlugin', (graph) => {
            console.log('🎉 编译完成')
        });
    }
}

module.exports = LogPlugin;