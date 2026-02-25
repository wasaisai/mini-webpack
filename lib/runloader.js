

module.exports = function (filePath, source, rules) {
    const matchedLoaders = [];

    rules.forEach(rule => {
        if (rule.test.test(filePath)) {
            matchedLoaders.push(...rule.use)
        }  
    });

    // loader 倒序执行
    for (let i = matchedLoaders.length - 1; i >= 0; i--) {
        const loader = require(matchedLoaders[i]);
        source = loader(source)
    }

    return source;
}