// 依赖图

const path = require('path');
const { parseModule } = require('./parser');

// 先不考虑所有边界，只解决一个问题：从entry出发，递归解析所有依赖
function buildDependencyGraph(entry) {
    const graph = {};
    const visited = new Set(); // 去重集合，避免重复遍历，避免死循环

    function dfs(filename) {
        if (visited.has(filename)) return;
        visited.add(filename);

        const { dependencies } = parseModule(filename);

        // 领接表，最常见的图存储结构
        graph[filename] = {
            dependencies: {}
        }


        const dirname = path.dirname(filename);

        dependencies.forEach(relativePath => {
            // 相对路径转成绝对路径，避免相同模块因相对路径不同而被重复解析
            const absolutePath = path.resolve(dirname, relativePath);
            graph[filename].dependencies[relativePath] = absolutePath;

            dfs(absolutePath)
        })
    }

    dfs(entry);
    return graph;
}

module.exports = { buildDependencyGraph }