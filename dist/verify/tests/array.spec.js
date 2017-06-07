'use strict';

var expect = require('expect.js');
var Schema = require('../index');

describe('array', function () {
  it('works for type', function (done) {
    new Schema({
      v: {
        type: 'array'
      }
    }).validate({
      v: ''
    }, function (errors) {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v is not an array');
      done();
    });
  });

  it('works for type and required', function (done) {
    new Schema({
      v: {
        required: true,
        type: 'array'
      }
    }).validate({
      v: ''
    }, function (errors) {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v is not an array');
      done();
    });
  });

  it('works for none require', function (done) {
    new Schema({
      v: {
        type: 'array'
      }
    }).validate({
      v: []
    }, function (errors) {
      expect(errors).to.be(null);
      done();
    });
  });

  it('works for empty array', function (done) {
    new Schema({
      v: {
        required: true,
        type: 'array'
      }
    }).validate({
      v: []
    }, function (errors) {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v is required');
      done();
    });
  });

  it('works for undefined array', function (done) {
    new Schema({
      v: {
        required: true,
        type: 'array'
      }
    }).validate({
      v: undefined
    }, function (errors) {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v is required');
      done();
    });
  });

  it('works for null array', function (done) {
    new Schema({
      v: {
        required: true,
        type: 'array'
      }
    }).validate({
      v: null
    }, function (errors) {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v is required');
      done();
    });
  });

  it('works for none empty', function (done) {
    new Schema({
      v: {
        required: true,
        type: 'array',
        message: 'haha'
      }
    }).validate({
      v: [1]
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