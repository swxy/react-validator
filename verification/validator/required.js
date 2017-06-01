import rules from '../rule/';

/*
function required(rule, value, callback, source, options) {
    const errors = [];
    const type = Array.isArray(value) ? 'array' : typeof value;
    rules.required(rule, value, source, errors, options, type);
    callback(errors);
}


export default required;
*/

function required(rule, value, field, source, options) {
    // callback(errors);
    return new Promise((resolve, reject) => {
        const errors = [];
        const type = Array.isArray(value) ? 'array' : typeof value;
        rule.field = field;
        rules.required(rule, value, source, errors, options, type);
        if (errors.length) {
            reject(errors);
        }
        else {
            resolve('success');
        }
    })
}


module.exports = required;