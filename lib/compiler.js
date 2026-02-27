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

    buildModule(filePath) {
        let source = fs.readFileSync(filePath, 'utf-8');

        // 执行loader
        source = runLoaders(filePath, source, this.options.module?.rules || []);

        // 获取ast解析后的最终结果
        const { code, dependencies } = parseModule(source, filePath);

        return {
            filePath,
            dependencies,
            code
        }
    }

    buildGraph() {
        // 这里调用 parser + loader
        const entry = path.resolve(this.options.entry);

        const entryModule = this.buildModule(entry);

        const graph = {};
        const queue = [entryModule];

        for (let i = 0; i < queue.length; i++) {
            const module = queue[i];
            graph[module.filePath] = {
                dependencies: module.dependencies,
                code: module.code
            }
            
            Object.values(module.dependencies).forEach(depPath => {
                const absPath = depPath;

                if (!graph[absPath]) {
                    const childModule = this.buildModule(absPath);
                    queue.push(childModule);
                }
            })

        }
        
        return graph;
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