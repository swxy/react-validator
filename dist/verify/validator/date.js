'use strict';

var _rule = require('../rule/');

var _rule2 = _interopRequireDefault(_rule);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function date(rule, value, source, options) {
  // console.log('integer rule called %j', rule);
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  // console.log('validate on %s value', value);
  if (validate) {
    if ((0, _util.isEmptyValue)(value) && !rule.required) {
      return errors;
    }
    _rule2.default.required(rule, value, source, errors, options);
    if (!(0, _util.isEmptyValue)(value)) {
      _rule2.default.type(rule, value, source, errors, options);
      if (value) {
        _rule2.default.range(rule, value.getTime(), source, errors, options);
      }
    }
  }
  //callback(errors);
  return errors;
}

module.exports = date;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(date, 'date', 'verify/validator/date.js');
}();

;