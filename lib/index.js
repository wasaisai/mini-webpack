// 打包入口

const path = require('path');
// const { parseModule } = require('./parser');
const { buildDependencyGraph } = require('./graph');
const { generateBundle } = require('./bundle');
const fs = require('fs');


function run() {
    const entry = path.resolve(__dirname, '../src/index.js');
    const graph = buildDependencyGraph(entry);
    const bundle = generateBundle(graph, entry);

    const outputDir = path.resolve(__dirname, '../dist');
    const outputFile = path.join(outputDir, 'bundle.js');

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir)
    }

    // fs.writeFileSync('./dist/bundle.js', bundle); 这么写会报错，是因为这里相对的目录是node执行目录，
    // process.cwd(), node执行命令时所在的目录
    // __dirname：当前js文件所在的目录
    fs.writeFileSync(outputFile, bundle);
}

run();