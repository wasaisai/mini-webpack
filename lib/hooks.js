/**
 * 简化版tapable
 * 本质是发布订阅模式
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