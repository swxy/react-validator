/**
 * Created by baidu on 2017/5/27.
 */

class Parent {
    constructor() {
        console.log('this is parent');
    }
    render() {
        console.log('parent render');
    }
}

class Child extends Parent{
    constructor() {
        super();
        console.log('this is child');
    }

    render() {
        super.render();
        console.log('child render');
    }
}

new Child().render();