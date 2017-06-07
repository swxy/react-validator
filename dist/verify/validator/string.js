'use strict';

var _rule = require('../rule/');

var _rule2 = _interopRequireDefault(_rule);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  Performs validation for string types.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function string(rule, value, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
        if ((0, _util.isEmptyValue)(value, 'string') && !rule.required) {
            return errors;
        }
        _rule2.default.required(rule, value, source, errors, options, 'string');
        if (!(0, _util.isEmptyValue)(value, 'string')) {
            _rule2.default.type(rule, value, source, errors, options);
            _rule2.default.range(rule, value, source, errors, options);
            _rule2.default.pattern(rule, value, source, errors, options);
            if (rule.whitespace === true) {
                _rule2.default.whitespace(rule, value, source, errors, options);
            }
        }
    }
    return errors;
}

module.exports = string;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(string, 'string', 'verify/validator/string.js');
}();

;