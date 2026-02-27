
const path = require('path');
module.exports = function (filePath, source, rules) {
    const matchedLoaders = [];

    rules.forEach(rule => {
        if (rule.test.test(filePath)) {
            matchedLoaders.push(...rule.use)
        }  
    });

    if (matchedLoaders.length === 0) {
        return source;
    }

    console.log('匹配到 loader:', filePath, matchedLoaders);

    // loader 倒序执行
    for (let i = matchedLoaders.length - 1; i >= 0; i--) {
        const loaderPath = path.resolve(process.cwd(), matchedLoaders[i]);
        // require是“执行一个模块，并拿到它的结果：1. 读取文件；2. 执行文件代码；3. 返回module.exports
        // 等价于 const fn = require（'./math.js');
        // 等价于 const fn = function(x) {retun x * 2}
        // 实现动态加载
        const loader = require(loaderPath);

        source = loader(source)
    }

    return source;
}