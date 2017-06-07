'use strict';

var expect = require('expect.js');
var Schema = require('../index');

describe('messages', function () {
  it('can call messages', function (done) {
    var messages = {
      required: function required(f) {
        return f + ' required!';
      }
    };
    var schema = new Schema({
      v: {
        required: true
      },
      v2: {
        type: 'array'
      }
    });
    schema.messages(messages);
    schema.validate({
      v: '',
      v2: '1'
    }, function (errors) {
      expect(errors.length).to.be(2);
      expect(errors[0].message).to.be('v required!');
      expect(errors[1].message).to.be('v2 is not an array');
      expect(Object.keys(messages).length).to.be(1);
      done();
    });
  });

  it('can use options.messages', function (done) {
    var messages = {
      required: function required(f) {
        return f + ' required!';
      }
    };
    var schema = new Schema({
      v: {
        required: true
      },
      v2: {
        type: 'array'
      }
    });
    schema.validate({
      v: '',
      v2: '1'
    }, {
      messages: messages
    }, function (errors) {
      expect(errors.length).to.be(2);
      expect(errors[0].message).to.be('v required!');
      expect(errors[1].message).to.be('v2 is not an array');
      expect(Object.keys(messages).length).to.be(1);
      done();
    });
  });

  it('message can be object', function (done) {
    var atom = {};
    var messages = {
      required: atom
    };
    var schema = new Schema({
      v: {
        required: true
      }
    });
    schema.validate({
      v: ''
    }, {
      messages: messages
    }, function (errors) {
      expect(errors).to.be.ok();
      expect(errors.length).to.be(1);
      expect(errors[0].message).to.be(atom);
      expect(Object.keys(messages).length).to.be(1);
      expect(messages.required).to.be(atom);
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