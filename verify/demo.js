/**
 * Created by baidu on 2017/6/1.
 */
require('babel-register');
const Schema = require('./index');
new Schema({
    v: [{
        validator(rule, value, callback) {
            //callback(new Error('e1'));
            return ['e1'];
        },
    }, {
        validator(rule, value, callback) {
            //callback(new Error('e2'));
            return ['e2'];
        },
    }],
    v2: [{
        validator(rule, value, callback) {
            //callback(new Error('e3'));
            return ['e3'];
        },
    }],
}).validate({
    v: 2,
}, (errors) => {
    console.log(errors);
});