/**
 * Created by baidu on 2017/6/1.
 */
require('babel-register');
const Schema = require('./index');
new Schema({
    v: {
        required: false,
    },
}).validate({
    v: null,
}, (errors) => {
    console.log(errors);
});