
'use strict';

const should = require('should');
const File = require('vinyl');
const html2tsPlugin = require('../');

it('empty', function(done) {

  ''.should.equal('');

  done();
});

const contents = '<div > \n</div  >';
const expected = 'namespace a.b.c { export var test = `<div></div>`; }';

var doTest = function(path, contents, expected) {
  var src = new File({ path : path, contents : new Buffer(contents) });
  var stream = html2tsPlugin();
  stream.on('data', function(dst) {
    String(dst.contents).should.equal(expected);
  });
  stream.write(src);
  stream.end();
};

it('default(root) package', function(done) {
  doTest('test.html', contents, 'var test = `<div></div>`;');
  done();
});

it('single string', function(done) {
  doTest('a/b/c/test.html', contents, expected);
  done();
});

it('single string(win)', function(done) {
  doTest('a\\b\\c\\test.html', contents, expected);
  done();
});
