# mini-webpack
最终会完成一个 mini-webpack，具备：  
✅ entry / output  
✅ JS 模块依赖分析（AST） 
✅ 依赖图（Graph）  
✅ DFS / 拓扑排序思想 
✅ bundle 生成  
✅ 简单 loader  
✅ 简单 plugin

并且能回答这些问题：

Webpack 打包流程:
Webpack 的第一步是什么: 从entry出发，递归分析模块依赖；
parser 做了哪些阶段：词法分析 + 语法分析，parser本身不改代码，只负责解析，不负责遍历、不负责修改
@babel/traverse：它在“操作”什么：按规则遍历AST，并在指定节点执行回调

为什么要 AST？
AST能区分语法结构，避免字符串误判，并支持代码转换；

为什么要用 DFS？
DFS 更适合构建完整依赖闭包，不需要关心层级顺序。


loader / plugin 区别？

循环依赖怎么处理？

tree-shaking 为什么能做？


🧱 整体实现路线

我们会按 真实 Webpack 流程来，一共 7 步：

1️⃣ 初始化项目 & 入口
2️⃣ 读取文件 + AST 解析
3️⃣ 收集依赖（DFS）
4️⃣ 构建依赖图（Graph）
5️⃣ 生成 bundle（核心）
6️⃣ loader 机制
7️⃣ plugin 机制
