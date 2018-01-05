import test from 'ava';

import Model from '../app/lib/model.js';

const util = require('util')

let TestModel = Model.subclass(
    '/v1/test',
    {
        arr: [],
        str: ''
    }
);

let params = { arr: [1,2], str: 'foo'};
let model  = new TestModel(params);

test('Model class check', t => {
    t.true( model instanceof TestModel );
    t.true( model instanceof Model );
});

test('Model accessors', t => {
    t.is( model.str, 'foo' );
    t.is( model.arr[0], 1);
    t.is( model.arr[1], 2);
});

test('Model dump', t => {

    t.deepEqual(model.dump(),params);
});

let model2  = new TestModel(params);

test('Modify string attribute', t => {
    model2.str = 'bar';
    t.is(model2.str,'bar');
});

test('Modify list attribute', t => {
    model2.arr.push(3);
    model2.arr.unshift(0);
    t.deepEqual(model2.arr.dump(),[0,1,2,3]);

    model2.arr.pop();
    model2.arr.shift();
    t.deepEqual(model2.arr.dump(),[1,2]);

    model2.arr = [4,5,6];
    t.deepEqual(model2.arr.dump(),[4,5,6]);
});
