
'use strict';

const should = require('should');
const File = require('vinyl');
const html2tsPlugin = require('../');

it('empty', function(done) {
  ''.should.equal('');
  done();
});

var doTest = function(path, contents, expected, opts) {
  var src = new File({ path : path, contents : new Buffer(contents) });
  var stream = html2tsPlugin(opts);
  stream.on('data', function(dst) {
    String(dst.contents).should.equal(expected);
  });
  stream.write(src);
  stream.end();
};

it('default(root) package', function(done) {
  doTest('test.html',
      '   <div \n@test="@@@" > \n <br   /> </div  >  ',
      'var test = `<div @test="@@@"><br/></div>`;');
  done();
});

it('single string', function(done) {
  doTest('a/b/c/test.html',
      '   <div \n@test="@@@" > \n</div  >  ',
      'namespace a.b.c { export var test = `<div @test="@@@"></div>`; }');
  done();
});

it('single string(win)', function(done) {
  doTest('a\\b\\c\\test.html',
      '   <div \n@test="@@@" > \n</div  >  ',
      'namespace a.b.c { export var test = `<div @test="@@@"></div>`; }');
  done();
});

it('single string(no trimming)', function(done) {
  doTest('a/b/c/test.html',
      '   <div \n@test="@@@" > \n</div  >  ',
      'namespace a.b.c { export var test = `   <div \n@test="@@@" > \n</div  >  `; }',
      { trimWhitespaces : false });
  done();
});

