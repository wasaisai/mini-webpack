
        (function() {
            const modules = {"/Users/xianggua/github/mini-webpack/src/index.js":{"fn":"import { add } from './math.js';"},"/Users/xianggua/github/mini-webpack/src/math.js":{"fn":"export function add(a, b) {\n  return a + b;\n}"}};
            
        (function (modules, entry) {
    const cache = Object.create(null);
  
    function require(moduleId) {
      if (cache[moduleId]) return cache[moduleId].exports;
  
        const module = {
            exports: {},
            loaded: false
        };
      cache[moduleId] = module;
  
      function localRequire(relativePath) {
        return require(modules[moduleId].dependencies[relativePath]);
      }
  
        modules[moduleId].fn(localRequire, module, module.exports);
        module.loaded = true;
        
      return module.exports;
    }
  
    require(entry);
  })(modules, '/Users/xianggua/github/mini-webpack/src/index.js')
    
        })()
    