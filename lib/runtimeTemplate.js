module.exports = function (modules, entry) {
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
  };