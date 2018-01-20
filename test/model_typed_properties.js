import test from 'ava';

import Model from '../app/lib/model.js';

let TestModel = Model.subclass( '/v1/test', {

    id: '',
    arr: {
        type: 'Array',
        items: 'TestModel'
    },
    one: {
        type: 'TestModel',
        readOnly: true
    },
    empty: null
});

Model.add_types({ TestModel });

test('typed properties with plain objects', t => {

    let params = {
        id: 1,
        arr: [ { id: 2, arr: [] } ],
        one: { id: 3, arr: [] },
        empty: null
    };
    let model = new TestModel(params);

    t.deepEqual(model.dump(),params);
    t.true( model.one instanceof TestModel );
    t.true( model.arr[0] instanceof TestModel );

    let dumped = model.dump(true);
    let params2 = Object.assign({}, params);
    delete params2.one;
    t.deepEqual(dumped,params2);
});

test('typed properties with models', t => {

    let params = {
        id: 1,
        arr: [ new TestModel({ id: 2, arr: [] }) ],
        one: new TestModel({ id: 3, arr: [] }),
    };
    let model = new TestModel(params);

    params.arr[0] = params.arr[0].dump();
    params.one    = params.one.dump();

    t.deepEqual(model.dump(),params);
    t.true( model.one instanceof TestModel );
    t.true( model.arr[0] instanceof TestModel );

    let dumped = model.dump(true);
    let params2 = Object.assign({}, params);
    delete params2.one;
    t.deepEqual(dumped,params2);
});

test('upgrade typed array from scalar', t => {

    let params = {
        id: 1,
        arr: new TestModel({ id: 2, arr: [] }),
    };
    let model = new TestModel(params);

    params.arr = [ params.arr.dump() ];

    t.deepEqual(model.dump(),params);
});