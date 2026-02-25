/**
 * 执行顺序
 
   读取文件
     ↓
   应用 loader 链
     ↓
   生成 JS
     ↓
   AST 解析
 */

class StyleLoader {
    runtime(css) {
        const style = document.createElement('style');
        style.innerHTML = css;
        document.head.appendChild(style);
    }

    transform(source) {
        return `(${this.runtime.toString()})(${JSON.stringify(source)});`;
    }
}

module.exports = function (source) {
    return new StyleLoader().transform(source);
};