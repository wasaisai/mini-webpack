/**
 * 简化版tapable
 * 本质是发布订阅模式
 * | 概念     | 本质      |
 *| ------ | ------- |
 *| hook   | 事件      |
 *| plugin | 监听事件的函数 |

 */

class SyncHook {
    constructor() {
        this.tasks = [];
    }

    tap(name, task) {
        this.tasks.push(task)
    }

    call(...args) {
        this.tasks.forEach(task => task(...args))
    }
}

module.exports = { SyncHook };