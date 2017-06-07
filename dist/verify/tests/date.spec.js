'use strict';

var expect = require('expect.js');
var Schema = require('../index');

describe('date', function () {
  it('required works for undefined', function (done) {
    new Schema({
      v: {
        type: 'date',
        required: true
      }
    }).validate({
      v: undefined
    }, function (errors) {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v is required');
      done();
    });
  });

  it('required works for ""', function (done) {
    new Schema({
      v: {
        type: 'date',
        required: true
      }
    }).validate({
      v: ''
    }, function (errors) {
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be('v is not a date');
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