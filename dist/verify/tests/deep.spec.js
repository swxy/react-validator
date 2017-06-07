'use strict';

var expect = require('expect.js');
var Schema = require('../index');

describe('deep', function () {
  it('deep array specific validation', function (done) {
    new Schema({
      v: {
        required: true,
        type: 'array',
        fields: {
          0: [{ type: 'string' }],
          1: [{ type: 'string' }]
        }
      }
    }).validate({
      v: [1, 'b']
    }, function (errors) {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v.0 is not a string');
      done();
    });
  });

  it('deep object specific validation', function (done) {
    new Schema({
      v: {
        required: true,
        type: 'object',
        fields: {
          a: [{ type: 'string' }],
          b: [{ type: 'string' }]
        }
      }
    }).validate({
      v: {
        a: 1,
        b: 'c'
      }
    }, function (errors) {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v.a is not a string');
      done();
    });
  });

  describe('defaultField', function () {
    it('deep array all values validation', function (done) {
      new Schema({
        v: {
          required: true,
          type: 'array',
          defaultField: [{ type: 'string' }]
        }
      }).validate({
        v: [1, 2, 'c']
      }, function (errors) {
        expect(errors.length).to.be(2);
        expect(errors[0].message).to.be('v.0 is not a string');
        expect(errors[1].message).to.be('v.1 is not a string');
        done();
      });
    });

    it('array & required works', function (done) {
      var descriptor = {
        testArray: {
          type: 'array',
          required: true,
          defaultField: [{ type: 'string' }]
        }
      };
      var record = {
        testArray: []
      };
      var validator = new Schema(descriptor);
      validator.validate(record, function (errors, fields) {
        console.log(errors, fields);
        done();
      });
    });

    it('deep object all values validation', function (done) {
      new Schema({
        v: {
          required: true,
          type: 'object',
          defaultField: [{ type: 'string' }]
        }
      }).validate({
        v: {
          a: 1,
          b: 'c'
        }
      }, function (errors) {
        expect(errors.length).to.be(1);
        expect(errors[0].message).to.be('v.a is not a string');
        done();
      });
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