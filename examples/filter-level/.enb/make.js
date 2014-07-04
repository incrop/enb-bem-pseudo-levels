var path = require('path');
var rootPath = path.join(__dirname, '..', '..', '..');
var pseudo = require(rootPath);
var naming = require('bem-naming');

module.exports = function (config) {
    config.task('pseudo', function () {
        var dstpath = config.resolvePath('nested-pseudo-level.blocks');

        return pseudo(getLevels(config))
            .addBuilder(dstpath, function (file) {
                if (file.suffix === 'txt') {
                    var name = file.name.split('.')[0];
                    var notation = naming.parse(name);
                    var nestedPath = buildNestedPath(notation);

                    return {
                        sourcePath: file.fullname,
                        targetPath: path.join(dstpath, nestedPath, file.name)
                    };
                }
            })
            .build();
    });
};

function buildNestedPath(obj) {
    var buf = [obj.block];

    if (obj.elem) {
        buf.push('__' + obj.elem);
    }

    if (obj.modName) {
        buf.push('_' + obj.modName);
    }

    return path.join.apply(null, buf);
}

/**
 * Получение уровней блоков
 * @param {Object} config
 * @returns {*|Array}
 */
function getLevels(config) {
    return [
        'nested-level.blocks'
    ].map(function (level) {
        return config.resolvePath(level);
    });
}
