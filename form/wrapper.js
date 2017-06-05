/**
 * Created by swxy on 2017/6/2.
 */

import React, {cloneElement} from 'react';
import Schema from '../verification';

export default function formWrapper(WrappedComponent) {
    return class Enhancer extends WrappedComponent {
        constructor(props) {
            super(props);
            this.schema = new Schema();
            this.store = {};
            super.validate = this.validate.bind(this);
        }
        validate(callback) {
            const store = this.store;
            this.schema.validate(store, function (error) {
                console.log('result is: ', error);
                callback && callback(error, store);
            })
        }

        onChangeWithValidation(name, oldOnChange) {
            const schema = this.schema;
            const store = this.store;
            return function (e) {
                let error;
                const value = e.target.value;
                store[name] = value;
                console.log('wrapper change callback');
                schema.validate({[name]: value}, {keys: [name]}, function (err) {
                    console.log('validate result: ', err);
                    error = err;
                });
                oldOnChange && oldOnChange.call(oldOnChange, e, error, name);
            }
        }

        parseRule(elementsTree) {
            const parseRule = this.parseRule.bind(this);
            if (!elementsTree.props) { // 文本节点
                return elementsTree;
            }
            let children = React.Children.map(elementsTree.props.children, function (child) {
                return parseRule(child);
            });
            let rules = elementsTree.props['data-validation'];
            let {name, onChange} = elementsTree.props;
            let schema = this.schema;
            let newProps = {};
            if (name && rules) {
                schema.extend({
                    [name]: rules
                });
                newProps.onChange = this.onChangeWithValidation(name, onChange);
            }
            const props = Object.assign({}, elementsTree.props, newProps);
            return cloneElement(elementsTree, props, children);
        }

        render() {
            const elementsTree = super.render();
            return this.parseRule(elementsTree);
        }
    }
}
