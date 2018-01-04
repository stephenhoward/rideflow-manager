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

                self._set(k,v,true);
            }
        }
    }

    definition() {
        return {};
    }

    _set(k,v,nodirty) {
        let definition = this.definition();

        if ( k in definition ) {

            // special book-keeping for list properties
            if ( Array.isArray(definition[k]) ) {
                this._set_list(k,v,nodirty);
            }
            else if ( this.properties[k] !== v ) {

                if( ! nodirty ) {
                    this._mark_dirty( k, v, (a,b) => { return a === b } );
                }
                this.properties[k] = v;

                this.emit('model-changed');
            }

            return this.properties[k];
        }
        return null;
    }

    _set_list(k,v,nodirty) {
        let self = this;

        if ( ! this.properties[k] || ! this.properties[k].eq(v) ) {

            if ( ! nodirty ) {
                this._mark_dirty( k, v, (a,b) => { return a.eq(b) } );
            }

            if ( ! ( v instanceof ModelList ) ) {
                v = new ModelList(v);
            }

            v.once('list-replace', (new_list) => {
                self._set_list(k,new_list);
            });

            this.properties[k] = v;

            if ( this.id ) {
                this.save(k);
            }

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
            delete this.dirty[k];
        }

        if ( keys_changed ) {
            this.emit('model-changed');
        }
    }

    save(property) {
        let self  = this;
        let defer = $.Deferred();
        let url   = self.constructor.url();

        if ( self.id ) {
            url = url + '/' + self.id;
        }

        // only send what we need to:
        let data = {};
        if ( self.id ) {
            let all_data = self.dump();
            for ( let k in self.dirty ) {
                data[k] = all_data[k];
            }
        }
        else {
            data = self.dump();
        }

        // looking to only save 1 property:
        if ( property && property in data ) {
            let d = {};

            d[property] = data[property];
            data     = d;
        }

        if( ! Object.keys(data).length ) {
            defer.reject();
            return;
        }

        $.ajax({
            url         : url,
            type        : 'POST',
            dataType    : 'json',
            contentType : 'application/json; charset=utf-8',
            data        : JSON.stringify(data)
        }).done( (json) => {
            for( let k of Object.keys(json) ) {
                self._set(k,json[k],true);
            }
            self.dirty = {};
            self.emit('model-saved');
            defer.resolve(self);
        });

        return defer.promise();
    }

    delete() {
        let self = this;
        let defer = $.Deferred();
        let url = self.constructor.url() + '/' + self.id;

        if ( ! self.id ) {
            self.emit('model-deleted');
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

    static subclass(url,def) {
        let Subclass = class extends Model {
            definition() {
                return def;
            }
            static url() {
                return url;
            }
        }

        for( let k in def ) {
            Object.defineProperty(Subclass.prototype, k, {
                get: function get ()  { return this._get(k)   },
                set: function set (v) { return this._set(k,v) },
                enumerable: true
            });
        }

        return Subclass;
    }
}

class ModelList {
    constructor(arr) {
        this.array = arr;

        if ( arr == undefined ) {
            arr = [];
        }
        else if ( ! ( arr instanceof Array ) ) {
            arr = [ arr ];
        }

        let self = this;
        for( let i = 0; i < this.array.length; i++ ) {
            let model = self.array[i];

            self[i] = model;

            if ( model instanceof Model ) {
                model.on('model-deleted',() => { self.remove(model); } );
            }
        }

        Emitter(this);
    }

    push(item) {
        return this._mutate( (arr) => { arr.push(item) } );
    }

    concat(items) {
        return this._mutate( (arr) => { arr.concat(items) } );
    }

    remove(item) {
        return this._replaceList( this.array.filter( (i) => {

            if ( item instanceof Model ) {

                return i.id != item.id;
            }
            else {
                return i !== item;
            }
        } ) );
    }

    pop() {
        if ( this.length ) {
            return this._mutate( (arr) => { return arr.pop(item) } );

        }

        return null;
    }

    shift() {
        if ( this.length ) {
            return this._mutate( (arr) => { return arr.shift() } );
        }

        return null;
    }

    unshift(item) {
        return this._mutate( (arr) => { arr.unshift(item) } );
    }

    eq(arr) {

        if ( this.length != arr.length ) {
            return false;
        }

        for( let i=0; i<this.length; i++ ) {

            let a = this[i];
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
        let update = this._replaceList(arr);

        return result ? result : update;
    }

    _replaceList(arr) {
        let update = new ModelList(arr);

        this.emit('list-replace', update );

        return update;
    }

    _copy_items() {
        let copy = [];

        for( let i=0; i < this.length; i++ ) {
            copy.push( this[i] );
        }

        return copy;
    }

    get length() {
        return this.array.length;
    }

}

module.exports = Model;
