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
const fs = require('fs');
const path = require('path');
const { parseModule } = require('./parser');
const runLoaders = require('./runloader');
const defaultOptions = require('./defaultOptions');
const Complication = require('./compilation');

class Compiler {
    // 创建实例时执行：new compiler（）；
    constructor(options) {
        this.options = {
            ...defaultOptions,
            ...options,
            output: {
                ...defaultOptions.output,
                ...options.output
            }
        };

        this.hooks = {
            run: new SyncHook(),
            emit: new SyncHook(),
            done: new SyncHook(),
        }

        this.plugins = options.plugins || [];

        // 注册插件
        this.plugins.forEach(plugin => {
            plugin.apply(this);
            
        });
    }

    run() {
        this.hooks.run.call();

        const complication = new Complication(this.options);
        complication.build();

        this.hooks.emit.call(complication);

        this.emitFile(complication);

        // 执行hook
        this.hooks.done.call();

    }

    emitFile(complication) {
        const outputDir = path.resolve(complication.options.output.path);

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true})
        }

        for (const filename in complication.assets) {
            const source = complication.assets[filename];
            const filePath = path.join(outputDir, filename);
            fs.writeFileSync(filePath, source, 'utf-8')
        }

        console.log('✨ Build completed successfully!');

    }
}

module.exports = Compiler;