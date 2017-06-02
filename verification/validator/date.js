import rules from '../rule/';
import { isEmptyValue } from '../util';

function date(rule, value, source, options) {
  // console.log('integer rule called %j', rule);
  const errors = [];
  const validate = rule.required || (!rule.required && source.hasOwnProperty(rule.field));
  // console.log('validate on %s value', value);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return errors;
    }
    rules.required(rule, value, source, errors, options);
    if (!isEmptyValue(value)) {
      rules.type(rule, value, source, errors, options);
      if (value) {
        rules.range(rule, value.getTime(), source, errors, options);
      }
    }
  }
  //callback(errors);
  return errors;
}

module.exports = date;
