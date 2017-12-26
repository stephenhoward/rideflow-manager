const Emitter = require('component-emitter');

class Model {
    constructor(properties) {
        Emitter(this);

        let self        = this;
        this.properties = {};
        this.dirty      = {};

        for( let k of Object.keys(this.definition()) ) {
            if ( k in properties ) {

                let v = properties[k];

                // special book-keeping for list properties
                if ( this.definition()[k] instanceof Array ) {

                    v = new ModelList( v );
                    v.on('list-replace', (new_list) => {
                        self._set_list(k,new_list);
                    });
                }
                this.properties[k] = v;
            }
        }
    }

    definition() {
        return {};
    }

    _set(k,v) {
        if ( k in this.definition() ) {

            // special book-keeping for list properties
            if ( this.properties[k] instanceof ModelList ) {
                this._set_list(k,v);
            }

            if ( this.properties[k] !== v ) {

                this._mark_dirty( k, v, (a,b) => { return a === b } );
                this.properties[k] = v;

                this.emit('model-changed');
            }

            return this.properties[k];
        }
        return null;
    }

    _set_list(k,v) {
        let self = this;

        if ( ! this.properties[k].eq(v) ) {

            this._mark_dirty( k, v, (a,b) => { return a.eq(b) } );

            if ( ! ( v instanceof ModelList ) ) {
                v = new ModelList(v);
            }

            v.on('list-replace', (new_list) => {
                self._set_list(k,new_list);
            });

            this.properties[k] = v;

            this.emit('model-changed');
        }
    }

    _get(k) {
        if ( k in this.definition() ) {
            return this.properties[k];
        }
        return null;
    }

    _mark_dirty(k,v,eq) {
                // capture the original value
                if ( ! ( k in this.dirty ) ) {

                    this.dirty[k] = this.properties[k];
                }
                // looks like we're reverting to the original value
                else if ( eq( this.dirty[k], v ) ) {

                    delete this.dirty[k];
                }
    }

    revert() {
        let keys_changed = Object.keys( this.dirty );

        for( let k in this.dirty ) {
            this.properties[k] = this.dirty[k];
            delete dirty[k];
        }

        if ( keys_changed ) {
            this.emit('model-changed');
        }
    }

    save() {
        let self  = this;
        let defer = $.Deferred();
        let url   = self.constructor.url();

        if ( self.id ) {
            url = url + '/' + self.id;
        }

        $.ajax({
            url         : url,
            type        : 'POST',
            dataType    : 'json',
            contentType : 'application/json; charset=utf-8',
            data        : JSON.stringify(this.dump())
        }).done( (json) => {
            for( let k of Object.keys(json) ) {
                self._set(k,json[k]);
            }
            self.dirty = {};
            defer.resolve(self);
        });

        return defer.promise();
    }

    delete() {
        let self = this;
        let defer = $.Deferred();
        let url = self.constructor.url() + '/' + self.id;

        if ( ! self.id ) {
            defer.reject();
        }
        else {

            $.ajax({
                url         : url,
                type        : 'DELETE',
                dataType    : 'json',
            }).done( (json) => {
                self.emit('model-deleted');
                defer.resolve(self);
            }).fail( (json) => {
                defer.reject(json);
            });

        }

        return defer.promise();
    }

    dump() {
        let data = {};

        for( let k in this.properties ) {
            let v = this.properties[k];

            if ( v instanceof Model || v instanceof ModelList ) {
                data[k] = v.dump();
            }
            else {
                data[k] = v;
            }
        }

        return data;
    }

    eq(model) {

        if ( 'id' in this.definition() ) {
            return this.id == model.id;
        }

        if ( Object.keys(this.properties).length != Object.keys(model).length ) {
            return false;
        }

        for( k in this.properties ) {
            let a = this.properties[k];
            let b = model[k];

            if ( a instanceof Model || a instanceof ModelList ) {

                if ( ! a.eq(b) ) {
                    return false;
                }
            }
        }

        return true;
    }

}

class ModelList {
    constructor(arr) {
        Emitter(this);

        this.items  = [];

        if ( arr instanceof Array ) {
            this.items = arr;
        }
        else if ( arr !== undefined ) {
            this.items = [ arr ];
        }
        else {
            this.items = [];
        }

        this._index_items();
    }

    push(item) {
        return this._mutate( (arr) => { arr.push(item) } );
    }

    concat(items) {
        return this._mutate( (arr) => { arr.concat(items) } );
    }

    pop() {
        if ( this.items.length ) {
            return this._mutate( (arr) => { return arr.pop(item) } );

        }

        return null;
    }

    shift() {
        if ( this.items.length ) {
            return this._mutate( (arr) => { return arr.shift(item) } );
        }

        return null;
    }

    unshift() {
        return this._mutate( (arr) => { arr.unshift(item) } );
    }

    get length() {
        return this.items.length;
    }

    eq(arr) {

        if ( this.items.length != arr.length ) {
            return false;
        }

        for( let i=0; i<this.items.length; i++ ) {

            let a = this.items[i];
            let b = arr[i];

            if ( a instanceof Model ) {

                if ( ! a.eq( b ) ) {

                    return false;
                }
            }
            else if ( a !== b ) {

                return false;
            }
        }

        return true;
    }

    dump() {
        let arr = this._copy_items();

        for( let i=0; i < arr.length; i++ ) {

            if ( arr[i] instanceof Model ) {
                arr[i] = arr[i].dump();
            }
        }

        return arr;
    }

    _mutate(mutate) {

        let arr = this._copy_items();

        let result = mutate(arr);
        let update = new ModelList(arr);

        this.emit('list-replace', update );

        return result ? result : update;
    }

    _copy_items() {
        return this.items.slice(0);
    }

    _index_items() {

        for( let i=0; i<this.items.length; i++) {

            this[i] = this.items[i];
        }
    }
}

module.exports = Model;
