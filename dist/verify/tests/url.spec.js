'use strict';

var expect = require('expect.js');
var Schema = require('../index');

describe('url', function () {
  it('works for empty string', function (done) {
    new Schema({
      v: {
        type: 'url'
      }
    }).validate({
      v: ''
    }, function (errors) {
      expect(errors).to.be(null);
      done();
    });
  });

  it('works for ip url', function (done) {
    new Schema({
      v: {
        type: 'url'
      }
    }).validate({
      v: 'http://10.218.136.29/talent-tree/src/index.html'
    }, function (errors) {
      expect(errors).to.be(null);
      done();
    });
  });

  it('works for required empty string', function (done) {
    new Schema({
      v: {
        type: 'url',
        required: true
      }
    }).validate({
      v: ''
    }, function (errors) {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v is required');
      done();
    });
  });

  it('works for type url', function (done) {
    new Schema({
      v: {
        type: 'url'
      }
    }).validate({
      v: 'http://www.taobao.com'
    }, function (errors) {
      expect(errors).to.be(null);
      done();
    });
  });

  it('works for type url has query', function (done) {
    new Schema({
      v: {
        type: 'url'
      }
    }).validate({
      v: 'http://www.taobao.com/abc?a=a'
    }, function (errors) {
      expect(errors).to.be(null);
      done();
    });
  });

  it('works for type url has hash', function (done) {
    new Schema({
      v: {
        type: 'url'
      }
    }).validate({
      v: 'http://www.taobao.com/abc#!abc'
    }, function (errors) {
      expect(errors).to.be(null);
      done();
    });
  });

  it('works for type url has query and has', function (done) {
    new Schema({
      v: {
        type: 'url'
      }
    }).validate({
      v: 'http://www.taobao.com/abc?abc=%23&b=a~c#abc'
    }, function (errors) {
      expect(errors).to.be(null);
      done();
    });
  });

  it('works for type not a valid url', function (done) {
    new Schema({
      v: {
        type: 'url'
      }
    }).validate({
      v: 'http://www.taobao.com/abc?abc=%23&b=  a~c#abc    '
    }, function (errors) {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v is not a valid url');
      done();
    });
  });

  it('support skip schema', function (done) {
    new Schema({
      v: {
        type: 'url'
      }
    }).validate({
      v: '//g.cn'
    }, function (errors) {
      expect(errors).to.be(null);
      done();
    });
  });
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;