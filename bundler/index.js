// 打包入口

const path = require('path');
// const { parseModule } = require('./parser');
const { buildDependencyGraph } = require('./graph');


function run() {
    const entry = path.resolve(__dirname, '../src/index.js');
    // const result = parseModule(entry);
    const graph = buildDependencyGraph(entry);
}

run();