'use strict';

var expect = require('expect.js');
var Schema = require('../index');

describe('pattern', function () {
  it('works for non-required empty string', function (done) {
    new Schema({
      v: {
        pattern: /^\d+$/,
        message: 'haha'
      }
    }).validate({
      // useful for web, input's value defaults to ''
      v: ''
    }, function (errors) {
      expect(errors).to.be(null);
      done();
    });
  });

  it('works for required empty string', function (done) {
    new Schema({
      v: {
        pattern: /^\d+$/,
        message: 'haha',
        required: true
      }
    }).validate({
      // useful for web, input's value defaults to ''
      v: ''
    }, function (errors) {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('haha');
      done();
    });
  });

  it('works for non-required null', function (done) {
    new Schema({
      v: {
        pattern: /^\d+$/,
        message: 'haha'
      }
    }).validate({
      v: null
    }, function (errors) {
      expect(errors).to.be(null);
      done();
    });
  });

  it('works for non-required undefined', function (done) {
    new Schema({
      v: {
        pattern: /^\d+$/,
        message: 'haha'
      }
    }).validate({
      v: undefined
    }, function (errors) {
      expect(errors).to.be(null);
      done();
    });
  });

  it('works', function (done) {
    new Schema({
      v: {
        pattern: /^\d+$/,
        message: 'haha'
      }
    }).validate({
      v: ' '
    }, function (errors) {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('haha');
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