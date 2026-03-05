class SyncHook {
    constructor() {
        this.listeners = [];
    }

    tap(pluginName, fn) {
        this.listeners.push(fn)
    }

    call(...args) {
        this.listeners.forEach(fn => fn(...args))
    }
}