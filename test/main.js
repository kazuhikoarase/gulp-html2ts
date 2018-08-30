
'use strict';

const should = require('should');
const File = require('vinyl');
const html2tsPlugin = require('../');

it('empty', function(done) {

  ''.should.equal('');

  done();
});

it('single string', function(done) {

  var src = new File({ path : 'a/b/c/test.html', contents : new Buffer('<div></div>') });
  var stream = html2tsPlugin();
  stream.on('data', function(dst) {
    String(dst.contents).should.equal('namespace a.b.c { export var test = `<div></div>`; }');
  });
  stream.write(src);
  stream.end();

  done();
});
