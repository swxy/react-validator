/**
 * Created by swxy on 2017/5/27.
 */
import validators from './validator';
import {messages, newMessages} from './messages';
import {format, warning, complementError, deepMerge} from './util';

class Schema {
    constructor(descriptor) {
        this.rules = {};
        this._messages = newMessages();
        this.define(descriptor);
    }

    define(rules) {
        Object.keys(rules).forEach((ruleKey, idx) => {
            // 定义的时候先转化一下格式
            const rule = this.formatRule(ruleKey, rules[ruleKey]);
            this.rules[ruleKey] = Array.isArray(rule) ? rule : [rule];
        })
    }

    formatRule(field, rule) {
        if (Array.isArray(rule)) {
            return rule.map(r => (this.formatRule(field, r)));
        }
        else {
            return Object.assign({}, rule, {
                validator: this.getValidationMethod(rule),
                type: this.getType(rule),
                field: field
            });
        }
    }

    getValidationMethod(rule) {
        if (typeof rule === 'function') {
            return rule;
        }
        if (rule.validator && typeof rule.validator === 'function') {
            return rule.validator;
        }
        // 仅仅针对必填项{required: true}这种
        if (!rule.type && rule.required !== undefined) {
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
        if (options.messages) {
            let messages = this.messages();
            deepMerge(messages, options.messages);
            options.messages = messages;
        } else {
            options.messages = this.messages();
        }
        const keys = options.keys || Object.keys(this.rules);
        const errors = [];
        for (let key of keys) {
            const rules = this.rules[key];
            let value = source[key];
            for (let rule of rules) {
                let tempError = rule.validator(rule, value, key, source, options);
                // 直接返回string或者new Error('xxx')形式
                if (typeof tempError === 'string' || tempError.message) {
                    tempError = [tempError];
                }
                if (Array.isArray(tempError) && tempError.length) {
                    if (rule.message) {
                        tempError = [].concat(rule.message);
                    }
                    // 将字符串转化一下成对象形式
                    tempError = tempError.map(complementError(rule));
                    errors.push(...tempError);
                    // break;
                }
            }
        }
        callback(errors.length ? errors : null);
    }

    static register(type, validator) {
        if (typeof validator !== 'function') {
            throw new Error('Cannot register a validator by type, validator is not a function');
        }
        validator[type] = validator;
    }

    messages(messages) {
        if (messages) {
            this._messages = deepMerge(newMessages(), messages);
        }
        return this._messages;
    }
}

module.exports = Schema;