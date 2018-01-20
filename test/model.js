import test from 'ava';

import Model from '../app/lib/model.js';

const util = require('util')

let TestModel = Model.subclass(
    '/v1/test',
    {
        id : '',
        arr: [],
        str: ''
    }
);

let params = { id: 1, arr: [1,2], str: 'foo'};
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
    t.deepEqual(model.arr.dump(),params.arr);
});

test('Model useless revert', t => {
   model.revert();
   t.deepEqual(model.dump(),params); 
});

test('Model add_type check', t => {
    let types = Model.add_types( { TestModel } );
    let model = new types.TestModel(params);

    t.deepEqual(Object.keys(types),['TestModel']);
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


test('Model Reversion', t => {
    let model3 = new TestModel(params);

    model3.str='fiz';
    model3.arr=[];
    t.notDeepEqual(model3.dump(),params);
    model3.revert();
    t.deepEqual(model3.dump(),params);
});


test('Model equal by id', t => {
    let model4 = new TestModel(params);
    let model5 = new TestModel(params);

    t.true( model4.eq(model4) );
    t.true( model4.eq(model5) );
    t.true( model5.eq(model4) );
    model5.id=2;
    t.false( model4.eq(model5) );
    t.false( model5.eq(model4) );

});

test ('Model equal', t => {

    let noIdModel = Model.subclass(
        '/v1/test',
        {
            arr: [],
            str: ''
        }
    );

    let params2 = { arr: [0,1,2], str: 'test' };

    let model_a = new noIdModel(params2);
    let model_b = new noIdModel(params2);
    let model_c = new noIdModel({ str: 'test' });

    t.true( model_a.eq(model_a) );
    t.true( model_a.eq(model_b) );
    t.false( model_a.eq(model_c) );

    model_c.arr = params2.arr;

    t.true( model_a.eq(model_c) );
});
