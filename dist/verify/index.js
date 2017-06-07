'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by swxy on 2017/5/27.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _validator = require('./validator');

var _validator2 = _interopRequireDefault(_validator);

var _messages3 = require('./messages');

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Schema = function () {
    function Schema(descriptor) {
        _classCallCheck(this, Schema);

        this.rules = null;
        this._messages = (0, _messages3.newMessages)();
        this.define(descriptor);
    }

    _createClass(Schema, [{
        key: 'define',
        value: function define(rules) {
            var _this = this;

            this.rules = {};
            if (rules) {
                Object.keys(rules).forEach(function (ruleKey, idx) {
                    // 定义的时候先转化一下格式
                    var rule = _this.formatRule(ruleKey, rules[ruleKey]);
                    _this.rules[ruleKey] = Array.isArray(rule) ? rule : [rule];
                });
            }
        }
        // 用于扩展规则

    }, {
        key: 'extend',
        value: function extend(rules) {
            var _this2 = this;

            if ((typeof rules === 'undefined' ? 'undefined' : _typeof(rules)) !== 'object') {
                return;
            }
            Object.keys(rules).forEach(function (ruleKey, idx) {
                // 定义的时候先转化一下格式
                var rule = _this2.formatRule(ruleKey, rules[ruleKey]);
                if (!_this2.rules[ruleKey]) {
                    _this2.rules[ruleKey] = [];
                }
                if (Array.isArray(rule)) {
                    var _rules$ruleKey;

                    (_rules$ruleKey = _this2.rules[ruleKey]).push.apply(_rules$ruleKey, _toConsumableArray(rule));
                } else {
                    _this2.rules[ruleKey].push(rule);
                }
            });
        }
    }, {
        key: 'getRule',
        value: function getRule(name) {
            return this.rules[name];
        }
    }, {
        key: 'formatRule',
        value: function formatRule(field, rule) {
            var _this3 = this;

            if (Array.isArray(rule)) {
                return rule.map(function (r) {
                    return _this3.formatRule(field, r);
                });
            } else {
                return Object.assign({}, rule, {
                    validator: this.getValidationMethod(rule),
                    type: this.getType(rule),
                    field: field
                });
            }
        }
    }, {
        key: 'getValidationMethod',
        value: function getValidationMethod(rule) {
            if (typeof rule === 'function') {
                return rule;
            }
            if (rule.validator && typeof rule.validator === 'function') {
                return rule.validator;
            }
            // 仅仅针对必填项{required: true}这种
            if (!rule.type && rule.required !== undefined) {
                return _validator2.default.required;
            }
            return _validator2.default[this.getType(rule)] || false;
        }
    }, {
        key: 'getType',
        value: function getType(rule) {
            if (rule.type === undefined && rule.pattern instanceof RegExp) {
                rule.type = 'pattern';
            }
            if (typeof rule.validator !== 'function' && rule.type && !_validator2.default.hasOwnProperty(rule.type)) {
                throw new Error((0, _util.format)('Unknown rule type %s', rule.type));
            }
            return rule.type || 'string';
        }
    }, {
        key: 'validate',
        value: function validate(source) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var callback = arguments[2];

            if (typeof options === 'function') {
                callback = options;
                options = {};
            }
            if (options.messages) {
                var _messages2 = this.messages();
                (0, _util.deepMerge)(_messages2, options.messages);
                options.messages = _messages2;
            } else {
                options.messages = this.messages();
            }
            var keys = options.keys || Object.keys(this.rules);
            var errors = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    var rules = this.rules[key];
                    var value = source[key];
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = rules[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var rule = _step2.value;

                            var tempError = rule.validator(rule, value, source, options);
                            // 直接返回string或者new Error('xxx')形式
                            if (typeof tempError === 'string' || tempError.message) {
                                tempError = [tempError];
                            }
                            if (Array.isArray(tempError) && tempError.length) {
                                if (rule.message) {
                                    tempError = [].concat(rule.message);
                                }
                                // 将字符串转化一下成对象形式
                                tempError = tempError.map((0, _util.complementError)(rule));
                                errors.push.apply(errors, _toConsumableArray(tempError));
                                break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            callback(errors.length ? errors : null);
        }
    }, {
        key: 'messages',
        value: function messages(_messages) {
            if (_messages) {
                this._messages = (0, _util.deepMerge)((0, _messages3.newMessages)(), _messages);
            }
            return this._messages;
        }
    }], [{
        key: 'register',
        value: function register(type, validator) {
            if (typeof validator !== 'function') {
                throw new Error('Cannot register a validator by type, validator is not a function');
            }
            _validator2.default[type] = validator;
        }
    }]);

    return Schema;
}();

module.exports = Schema;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Schema, 'Schema', 'verify/index.js');
}();

;