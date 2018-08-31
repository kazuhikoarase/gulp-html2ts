//
// html2ts
//

const PluginError = require('plugin-error');
const through = require('through2');
const path = require('path');

const PLUGIN_NAME = 'gulp-html2ts';
const nsRe = new RegExp(path.sep.replace(/\\/g, '\\\\'), 'g')
const trimRe = /\s*>\s*/g;

module.exports = function(opts) {
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
    } else if (file.isBuffer() ) {
      var parsedPath = path.parse(file.relative);
      var ns = parsedPath.dir.replace(nsRe, '.');
      var name = parsedPath.name;
      var contents = file.contents;
      contents = Buffer.from(String(contents).replace(trimRe, '>') );
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
