'use strict';

require('babel-register');
var expect = require('expect.js');
var Schema = require('../index');
var required = true;

describe('required', function () {
  it('works for array required=true', function (done) {
    new Schema({
      v: [{
        required: required,
        message: 'no'
      }]
    }).validate({
      v: []
    }, function (errors) {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('no');
      done();
    });
  });

  it('works for array required=true & custom message', function (done) {
    // allow custom message
    new Schema({
      v: [{
        required: required,
        message: 'no'
      }]
    }).validate({
      v: [1]
    }, function (errors) {
      expect(errors).not.to.be.ok();
      done();
    });
  });

  it('works for array required=false', function (done) {
    new Schema({
      v: {
        required: false
      }
    }).validate({
      v: []
    }, function (errors) {
      expect(errors).not.to.be.ok();
      done();
    });
  });

  it('works for string required=true', function (done) {
    new Schema({
      v: {
        required: required
      }
    }).validate({
      v: ''
    }, function (errors) {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v is required');
      done();
    });
  });

  it('works for string required=false', function (done) {
    new Schema({
      v: {
        required: false
      }
    }).validate({
      v: ''
    }, function (errors) {
      expect(errors).not.to.be.ok();
      done();
    });
  });

  it('works for number required=true', function (done) {
    new Schema({
      v: {
        required: required
      }
    }).validate({
      v: 1
    }, function (errors) {
      expect(errors).not.to.be.ok();
      done();
    });
  });

  it('works for number required=false', function (done) {
    new Schema({
      v: {
        required: false
      }
    }).validate({
      v: 1
    }, function (errors) {
      expect(errors).not.to.be.ok();
      done();
    });
  });

  it('works for null required=true', function (done) {
    new Schema({
      v: {
        required: required
      }
    }).validate({
      v: null
    }, function (errors) {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v is required');
      done();
    });
  });

  it('works for null required=false', function (done) {
    new Schema({
      v: {
        required: false
      }
    }).validate({
      v: null
    }, function (errors) {
      expect(errors).not.to.be.ok();
      done();
    });
  });

  it('works for undefined required=true', function (done) {
    new Schema({
      v: {
        required: required
      }
    }).validate({
      v: undefined
    }, function (errors) {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v is required');
      done();
    });
  });

  it('works for undefined required=false', function (done) {
    new Schema({
      v: {
        required: false
      }
    }).validate({
      v: undefined
    }, function (errors) {
      expect(errors).not.to.be.ok();
      done();
    });
  });
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(required, 'required', 'verify/tests/required.spec.js');
}();

;