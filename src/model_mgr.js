/**
 * Created by jun.li on 11/02.
 */
'use strict';
var _file = require('fs');
var _path = require('path');
function ModelsMgr() {
    return function (dir) {
        var files = [];
        var models = {};
        dir = dir || __dirname;
        var init_dir_len = dir.length;
        var getAllFiles = function (dir, parent_dir) {
            parent_dir = parent_dir || '';
            var fs = _file.readdirSync(dir), temp_name = '', temp_path = '';
            fs.forEach(function (e) {
                if (e.indexOf('auto_routes.js') !== -1 || e.indexOf('index.js') !== -1) {
                    return;
                }
                if (e.indexOf('.') === -1) {
                    return getAllFiles(_path.join(dir, '/', e), e);
                }
                temp_name = e.split('.')[0];
                temp_path = dir.substr(init_dir_len).replaceAll('\\\\', '/');
                parent_dir && (temp_name = temp_path + '/' + temp_name);
                (!parent_dir) && (temp_name = '/' + temp_name);
                files.push({file: _path.join(dir, '/', e), name: temp_name});
            });
        };
        var loadModules = function () {
            files.forEach(function (e) {
                models[e.name] = require(e.file);
            });
        };
        getAllFiles(dir);
        loadModules();

        return models;
    };
}

module.exports = ModelsMgr();