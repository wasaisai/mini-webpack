const fs = require('fs');
const path = require('path');

class AssetListPlugin {
    apply(compiler) {
        compiler.hooks.emit.tap('AssetListPlugin', () => {
            const outputPath = compiler.options.output.path;
            const content = `
              Build Time: ${new Date().toLocaleString()}
            `;

            fs.writeFileSync(
                path.join(outputPath, 'build-info.txt'),
                content
            );
        });
    }
}

module.exports = AssetListPlugin;