/**
 * Compiler 是：
   🔥 构建流程的调度者
   🔥 生命周期的管理者
   🔥 Loader / Plugin 的容器
   
   Compiler 是入口
   所有流程都由它驱动
   hooks 挂在它身上
   plugin 通过 compiler 接入
 */

const { SyncHook } = require('./hooks');


class Compiler {
    // 创建实例时执行：new compiler（）；
    constructor(options) {
        this.options = options;
        this.hooks = {
            run: new SyncHook(),
            emit: new SyncHook(),
            done: new SyncHook(),
        }
    }

    run() {
        this.hooks.run.call();

        const graph = this.buildGraph();

        this.hooks.emit.call(graph);

        this.emitFile(graph);
        this.hooks.done.call();

    }
}