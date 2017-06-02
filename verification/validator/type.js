import rules from '../rule/';
import { isEmptyValue } from '../util';

function type(rule, value, source, options) {
  const ruleType = rule.type;
  const errors = [];
  const validate = rule.required || (!rule.required && source.hasOwnProperty(rule.field));
  if (validate) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return errors;
    }
    rules.required(rule, value, source, errors, options, ruleType);
    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source, errors, options);
    }
  }
  //callback(errors);
  return errors;
}

module.exports = type;
