
        (function(modules) {
            const cache = {};
            
            function require(moduleId) {
                if (cache[moduleId]) {
                    return cache[moduleId].exports;
                }

                const module = cache[module] = {
                    exports: {}
                };

                function localRequire(relativePath) {
                    return require(modules[moduleId].dependences[relativePath]);
                }


            modules[moduleId].call(
                module.exports,
                localRequire,
                module,
                module.exports
            )
            return module.exports;
    
            }
            require('/Users/xianggua/github/mini-webpack/src/index.js')

        })({
            
            '/Users/xianggua/github/mini-webpack/src/index.js': function ( requite, module, exports) {
                undefined
            },
        
            '/Users/xianggua/github/mini-webpack/src/math.js': function ( requite, module, exports) {
                undefined
            },
        
        })
    