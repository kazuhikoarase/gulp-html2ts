//
// html2ts
//

const PluginError = require('plugin-error');
const through = require('through2');
const path = require('path');

const PLUGIN_NAME = 'gulp-html2ts';

const nsRe = new RegExp(path.sep.replace(/\\/g, '\\\\'), 'g')

const trimRe1 = /\s*\n\s*/g;
const trimRe2 = /\s*(\/?>)\s*/g;
const trimRe3 = /\s+(<)/g;

var trimWhitespaces = function(src) {
  return Buffer.from(String(src).
      // trim ws + \n + ws to single space.
      replace(trimRe1, '\u0020').
      // trim each side spaces.
      replace(trimRe2, '$1').
      // trim leading spaces.
      replace(trimRe3, '$1') );
};

var extend = function(target, base) {
  for (var k in base) {
    if (typeof target[k] == 'undefined') {
      target[k] = base[k];
    }
  }
  return target;
};

module.exports = function(opts) {
  opts = extend(opts || {}, {
    trimWhitespaces : true
  });
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
    } else if (file.isBuffer() ) {
      var parsedPath = path.parse(file.relative);
      var ns = parsedPath.dir.replace(nsRe, '.');
      var name = parsedPath.name;
      var contents = file.contents;
      if (opts.trimWhitespaces) {
        contents = trimWhitespaces(contents);
      }
      if (ns) {
        // some namespace
        file.contents = Buffer.concat([
          Buffer.from(`namespace ${ns} { export var ${name} = `),
          Buffer.from('`'),
          contents,
          Buffer.from('`; }')] );
      } else {
        // default(root) namespace
        file.contents = Buffer.concat([
          Buffer.from(`var ${name} = `),
          Buffer.from('`'),
          contents,
          Buffer.from('`;')] );
      }
    } else if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'stream not supported.'));
    }
    return cb(null, file);
  });
};
