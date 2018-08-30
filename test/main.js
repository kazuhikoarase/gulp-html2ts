
'use strict';

const should = require('should');
const File = require('vinyl');
const html2tsPlugin = require('../');

it('empty', function(done) {

  ''.should.equal('');

  done();
});

const inhtml = new Buffer('<div></div>');
const expected = 'namespace a.b.c { export var test = `<div></div>`; }';

it('single string', function(done) {


  !function() {
    var src = new File({ path : 'a/b/c/test.html', contents : inhtml });
    var stream = html2tsPlugin();
    stream.on('data', function(dst) {
      String(dst.contents).should.equal(expected);
    });
    stream.write(src);
    stream.end();
  }();

  !function() {
    var src = new File({ path : 'a\\b\\c\\test.html', contents : inhtml });
    var stream = html2tsPlugin();
    stream.on('data', function(dst) {
      String(dst.contents).should.equal(expected);
    });
    stream.write(src);
    stream.end();
  }();

  done();
});
