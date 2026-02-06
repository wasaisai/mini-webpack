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
Webpack 的第一步是什么: 从entry出发，递归分析模块依赖

为什么要 AST？

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
