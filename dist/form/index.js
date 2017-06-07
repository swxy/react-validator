'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; }; /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Created by swxy on 2017/6/2.
                                                                                                                                                                                                                                                                                                                                                                                                                                                     */

exports.default = formWrapper;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _verify = require('../verify');

var _verify2 = _interopRequireDefault(_verify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function formWrapper(WrappedComponent) {
    return function (_WrappedComponent) {
        _inherits(Enhancer, _WrappedComponent);

        function Enhancer(props) {
            _classCallCheck(this, Enhancer);

            var _this = _possibleConstructorReturn(this, (Enhancer.__proto__ || Object.getPrototypeOf(Enhancer)).call(this, props));

            _this.schema = new _verify2.default();
            _this.store = {};
            _set(Enhancer.prototype.__proto__ || Object.getPrototypeOf(Enhancer.prototype), 'validate', _this.validate.bind(_this), _this);
            return _this;
        }

        _createClass(Enhancer, [{
            key: 'validate',
            value: function validate(callback) {
                var store = this.store;
                this.schema.validate(store, function (error) {
                    console.log('result is: ', error);
                    callback && callback(error, store);
                });
            }
        }, {
            key: 'onChangeWithValidation',
            value: function onChangeWithValidation(name, oldOnChange) {
                var schema = this.schema;
                var store = this.store;
                return function (e) {
                    var error = void 0;
                    var value = e.target.value;
                    store[name] = value;
                    // console.log('wrapper change callback');
                    schema.validate(_defineProperty({}, name, value), { keys: [name] }, function (err) {
                        // console.log('validate result: ', err);
                        error = err;
                    });
                    oldOnChange && oldOnChange.call(oldOnChange, e, error, name);
                };
            }
        }, {
            key: 'parseRule',
            value: function parseRule(elementsTree) {
                var parseRule = this.parseRule.bind(this);
                if (!elementsTree.props) {
                    // 文本节点
                    return elementsTree;
                }
                var children = _react2.default.Children.map(elementsTree.props.children, function (child) {
                    return parseRule(child);
                });
                var rules = elementsTree.props['data-validation'];
                var force = elementsTree.props['data-validation-force'];
                var _elementsTree$props = elementsTree.props,
                    name = _elementsTree$props.name,
                    onChange = _elementsTree$props.onChange;

                var schema = this.schema;
                var newProps = {};
                if (name && rules && rules.length) {
                    var oldRule = schema.getRule(name);
                    if (force || !oldRule || !oldRule.length) {
                        console.log('extend rule');
                        schema.extend(_defineProperty({}, name, rules));
                    }
                    newProps.onChange = this.onChangeWithValidation(name, onChange);
                }
                var props = Object.assign({}, elementsTree.props, newProps);
                return (0, _react.cloneElement)(elementsTree, props, children);
            }
        }, {
            key: 'render',
            value: function render() {
                var elementsTree = _get(Enhancer.prototype.__proto__ || Object.getPrototypeOf(Enhancer.prototype), 'render', this).call(this);
                return this.parseRule(elementsTree);
            }
        }]);

        return Enhancer;
    }(WrappedComponent);
}
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(formWrapper, 'formWrapper', 'form/index.js');
}();

;