import rules from '../rule/';


function required(rule, value, field, source, options) {
    const errors = [];
    const type = Array.isArray(value) ? 'array' : typeof value;
    rules.required(rule, value, source, errors, options, type);
    return errors;
}

//export default required;

module.exports = required;