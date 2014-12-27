var os = require('os');
var path = require('path');
var utils = require('../utils/utils');

module.exports = function(glob, root, done) {
    var filelist = utils.unglob(glob, root);
    var result = '';///// <reference path="./_references.d.ts" />' + os.EOL;

    filelist.forEach(function(filename, idx) {
        filename = filename.substr(0, filename.length - 3);
        result = result + "export import spec" + idx + " = require('" + filename + "');" + os.EOL;
    })

    return result;
}

function forward_slash(str) {
    return str.replace(/\\/g, '/');
}