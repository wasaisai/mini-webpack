// 依赖图: 构建模块数据库

const path = require('path');
const fs = require('fs');
const { parseModule } = require('./parser');
const runLoaders = require('./runloader');


// 先不考虑所有边界，只解决一个问题：从entry出发，递归解析所有依赖
/**
 * 
 * @param {*} entry 
 * @returns 
 * 1. 读取入口文件
   2. 经过 loader 转换
   3. 解析 AST，得到依赖
   4. 把它放入 graph
   5. 放入 queue
   6. 只要 queue 里还有模块
   7. 取出一个模块
   8. 读取它的所有依赖
   9. 重复步骤 1-5
 */
function buildDependencyGraph(entry, options) {
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
        // AST 解析器只认识 JS,因此需要在执行AST之前，使用loader将内容转换为js
        const transformed = runLoaders(entryPath, source, options.rules || []);

        // ast解析 + 获取依赖 + 转code
        const { dependencies, code } = parseModule(transformed, absolutePath);

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