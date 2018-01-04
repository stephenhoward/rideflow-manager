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
let tm = new TestModel(params);

test('Model class check', t => {
    t.true( tm instanceof TestModel );
    t.true( tm instanceof Model );
});
test('Model accessors', t => {
    t.is( tm.str, 'foo' );
    t.is( tm.arr[0], 1);
    t.is( tm.arr[1], 2);
})
test('Model dump', t => {

    t.deepEqual(tm.dump(),params);
})
