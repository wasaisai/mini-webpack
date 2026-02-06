// 打包入口

const path = require('path');
function run() {
    const entry = path.resolve(__dirname, '../src/index.js');
    console.log('entry:', entry)
}

run();