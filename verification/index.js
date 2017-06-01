/**
 * Created by swxy on 2017/5/27.
 */
import validators from './validator';
import {format, warning} from './util';

class Schema {
    constructor(descriptor) {
        this.rules = {};
        this.define(descriptor);
    }

    define(rules) {
        Object.keys(rules).forEach((ruleKey, idx) => {
            // 定义的时候先转化一下格式
            const rule = this.formatRule(rules[ruleKey]);
            this.rules[ruleKey] = Array.isArray(rule) ? rule : [rule];
        })
    }

    formatRule(rule) {
        if (Array.isArray(rule)) {
            return rule.map(r => (this.formatRule(r)));
        }
        else {
            return Object.assign({}, rule, {
                validator: this.getValidationMethod(rule),
                type: this.getType(rule)
            });
        }
    }

    getValidationMethod(rule) {
        if (typeof rule === 'function') {
            return rule;
        }
        // 仅仅针对必填项{required: true}这种
        if (!rule.type && rule.required) {
            return validators.required;
        }
        return validators[this.getType(rule)] || false;
    }

    getType(rule) {
        if (rule.type === undefined && (rule.pattern instanceof RegExp)) {
            rule.type = 'pattern';
        }
        if (typeof rule.validator !== 'function' &&
            (rule.type && !validators.hasOwnProperty(rule.type))) {
            throw new Error(format('Unknown rule type %s', rule.type));
        }
        return rule.type || 'string';
    }

    validate(source, options = {}, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }
        console.log('validating....');
        const keys = options.keys || Object.keys(this.rules);
        const errors = [];
        const results = keys.map(key => {
            return new Promise((resolve, reject) => {
                const rules = this.rules[key];
                let value = source[key];
                const validators = rules.map(rule => (rule.validator(rule, value, key, source, options)));
                return Promise.all(validators).then(values => {
                    console.log(key, 'done', values);
                    resolve(values.join(', '));
                }).catch(err => {
                    errors.push(...err);
                    console.log(key, 'error', err);
                    reject(err.join(''));
                });
            })
        });
        Promise.all(results)
            .then(values => {
                console.log('all validate');
                callback();
            })
            .catch(err => {
                console.log('error', err);
                callback(errors);
            });
    }

    static register(type, validator) {
        if (typeof validator !== 'function') {
            throw new Error('Cannot register a validator by type, validator is not a function');
        }
        validator[type] = validator;
    }
}

module.exports = Schema;