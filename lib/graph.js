// 依赖图: 构建模块数据库

const path = require('path');
const fs = require('fs');
const { parseModule } = require('./parser');

// 先不考虑所有边界，只解决一个问题：从entry出发，递归解析所有依赖
function buildDependencyGraph(entry) {
    const graph = {};
    const visited = new Set(); // 去重集合，避免重复遍历，避免死循环

    function dfs(entryPath) {
        // 依赖图的路径必须唯一，如果用相对路径，可能指向同一个文件
        const absolutePath = path.resolve(entryPath);

        // 避免无限递归
        if (visited.has(absolutePath)) return;
        visited.add(absolutePath);

        // 读取文件
        const source = fs.readFileSync(absolutePath, 'utf-8');

        // ast解析 + 获取依赖 + 转code
        const { dependencies, code } = parseModule(source, absolutePath);

        // 领接表，最常见的图存储结构
        graph[absolutePath] = {
            dependencies,
            code,
        }

        // 递归解析依赖
        Object.values(dependencies).forEach(depPath => {
            dfs(depPath);
        });
    }

    dfs(entry);

    return graph;
}

module.exports = { buildDependencyGraph }