import test from 'ava';

import Model from '../app/lib/model.js';

let TestModel = Model.subclass(
    '/v1/test',
    {
        id: '',
        arr: []
    }
);

let params = { id: 1, arr: [1,2,3] };

test('array push/pop', t => {
    let model = new TestModel(params);
    model.arr.push(4);
    t.deepEqual(model.arr.dump(),[1,2,3,4]);
    t.is(model.arr.pop(),4);
    t.is(model.arr.pop(),3);
    t.deepEqual(model.arr.dump(),[1,2]);
    model.arr.pop();
    model.arr.pop();
    t.is(model.arr.pop(),null);
});

test('array unshift,shift', t => {
    let model = new TestModel(params);
    model.arr.unshift(0);
    t.deepEqual(model.arr.dump(),[0,1,2,3]);
    t.is(model.arr.shift(),0);
    t.is(model.arr.shift(),1);
    t.deepEqual(model.arr.dump(),[2,3]);
    model.arr.shift();
    model.arr.shift();
    t.is(model.arr.shift(),null);
});

test('array indexOf', t => {
    let model = new TestModel(params);
    t.is(model.arr.indexOf(2),1);
    t.is(model.arr.indexOf(6),-1);
});

test('array concat', t => {
    let model = new TestModel(params);
    model.arr.concat([4,5,6]);
    t.deepEqual(model.arr.dump(),[1,2,3,4,5,6]);
});

test('array concat', t => {
    let model = new TestModel(params);
    model.arr.concat([4,5,6]);
    t.deepEqual(model.arr.dump(),[1,2,3,4,5,6]);
});

test('array has/remove', t => {
    let model = new TestModel(params);
    t.true( model.arr.has(2) );
    model.arr.remove(2);
    t.false( model.arr.has(2) );
    model.arr.push(2);
});

test('array move item', t => {
    let model = new TestModel(params);
    model.arr.move(3,2);
    t.deepEqual(model.dump(),params);
    model.arr.move(3,1);
    t.deepEqual(model.arr.dump(),[1,3,2]);
    model.arr.move(3,2);
    t.deepEqual(model.arr.dump(),[1,2,3]);
    model.arr.move(42,1);
    t.deepEqual(model.arr.dump(),[1,2,3]);
});

test('array initialized as scalar', t => {
    let model = new TestModel({ id: 1, arr: 4});
    t.deepEqual(model.arr.dump(),[4]);
});

test('array initialized as model', t => {
    let model = new TestModel({ });
    let model2 = new TestModel({ id: 2, arr: [ model ]});
    t.is(model2.arr.indexOf(model),0);
    t.true(model2.arr.has(model));
    t.deepEqual(model2.arr.dump(),[model.dump()]);
    model.delete();
    t.deepEqual(model2.arr.dump(),[]);
    t.is(model2.arr.indexOf(model),-1);
    t.false(model2.arr.has(model));
});