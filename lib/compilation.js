/**
 * 某一次构建的具体产物过程，一次完整的构建任务，存储本次构建的依赖图，生成的文件。
 * 可支持并行构建
 * 支持多次增量构建
 * 支持热更新
 * 可支持多entry、多chunk
 * 每一次构建都需要一个“独立的数据空间”
 */

const path = require('path');
const { buildDependencyGraph } = require('./graph');
const {generateBundle} = require('./bundle.js');

class Compilation {
    constructor(options) {
        // 配置
        this.options = options;
        // 存储依赖图graph
        this.modules = [];
        // 存储最终输出的文件
        this.assets = {};
    }

    build() {
        const entryPath = path.resolve(this.options.entry);
        // 生成依赖图
        this.modules = buildDependencyGraph(entryPath, this.options);
        // 生成最终产物
        this.seal();
    }

    seal() {
        const entryPath = path.resolve(this.options.entry);
        let bundle = generateBundle(this.modules, entryPath);

        this.assets[this.options.output.filename] = bundle;
    }
}

module.exports = Compilation;