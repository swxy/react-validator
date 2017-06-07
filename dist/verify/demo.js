'use strict';

/**
 * Created by baidu on 2017/6/1.
 */
require('babel-register');
var Schema = require('./index');
new Schema({
    v: [{
        validator: function validator(rule, value, callback) {
            //callback(new Error('e1'));
            return ['e1'];
        }
    }, {
        validator: function validator(rule, value, callback) {
            //callback(new Error('e2'));
            return ['e2'];
        }
    }],
    v2: [{
        validator: function validator(rule, value, callback) {
            //callback(new Error('e3'));
            return ['e3'];
        }
    }]
}).validate({
    v: 2
}, function (errors) {
    console.log(errors);
});
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }
}();

;