//
// html2ts
//

var path = require('path');
var through = require('through2');
var PluginError = require('plugin-error');

const PLUGIN_NAME = 'gulp-html2ts';
const nsRe = new RegExp(path.sep.replace(/\\/g, '\\\\'), 'g')

module.exports = function(opts) {
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
    } else if (file.isBuffer() ) {
        var parsed = path.parse(file.relative);
        var ns = parsed.dir.replace(nsRe, '.');
        var name = parsed.name;
        if (ns) {
          file.contents = Buffer.concat([
            Buffer.from(`namespace ${ns} { export var ${name} = `),
            Buffer.from('`'),
            file.contents,
            Buffer.from('`; }')] );
        } else {
          file.contents = Buffer.concat([
            Buffer.from(`var ${name} = `),
            Buffer.from('`'),
            file.contents,
            Buffer.from('`;')] );
        }
    } else if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'stream not supported.'));
    }
    return cb(null, file);
  });
};
