const Emitter = require('component-emitter');
const axios   = require('axios');

let ModelTypes = {};

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

    _set(k,v,nodirty) {
        let definition = this.definition();

        if ( k in definition ) {

            v = this._normalizeValue(v, definition[k]);

            // special book-keeping for list properties
            if ( Array.isArray(v) ) {
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

    _normalizeValue(value,definition) {
        let self = this;

        if ( value == null ) {
            return value;
        }

        if ( Array.isArray(definition) ) {
            if ( ! Array.isArray(value) ) {
                return [ value ];
            }

            return value;
        }
        else if ( definition instanceof Object ) {

            if ( definition.type == 'Array' ) {
                if ( ! Array.isArray(value) ) {
                    value = [ value ];
                }

                return value.map( (item) => {
                    return self._normalizeValue(item, { type: definition.items })
                } );
            }
            else {
                if ( ! ( value instanceof ModelTypes[definition.type] ) ) {
                    value = new ModelTypes[definition.type]( value );
                }
            }
        }

        return value;
    }

    revert() {
        let keys_changed = Object.keys( this.dirty );

        for( let k in this.dirty ) {
            this.properties[k] = this.dirty[k];
            delete this.dirty[k];
        }

        if ( keys_changed.length ) {
            this.emit('model-changed');
        }
    }

    save(property) {
        let self  = this;
        let url   = self.constructor.url();

        if ( self.id ) {
            url = url + '/' + self.id;
        }

        // only send what we need to:
        let data = {};
        if ( self.id ) {
            let all_data = self.dump(true);
            for ( let k in self.dirty ) {
                data[k] = all_data[k];
            }
        }
        else {
            data = self.dump(true);
        }

        // looking to only save 1 property:
        if ( property && property in data ) {
            let d = {};

            d[property] = data[property];
            data        = d;
        }

        return new Promise( (resolve,reject) => {

            // nothing new to save:
            if( ! Object.keys(data).length ) {
                resolve(self);
                return;
            }

            axios.post( url, JSON.stringify(data), {
                responseType : 'json',
                contentType  : 'application/json; charset=utf-8',
            }).then( (response) => {
                let json = response.data;
                for( let k of Object.keys(json) ) {
                    self._set(k,json[k],true);
                }
                self.dirty = {};
                self.emit('model-saved');
                resolve(self);
            })
            .catch( (error) => {
                reject(error);
            });
        });
    }

    delete() {
        let self  = this;
        let url   = self.constructor.url() + '/' + self.id;

        return new Promise( ( resolve, reject ) => {

            // cannot delete something with no id
            if ( ! self.id ) {
                self.emit('model-deleted');
                resolve(self);
            }
            else {

                axios.delete( url, {
                    responseType    : 'json',
                }).then( (response) => {
                    self.emit('model-deleted');
                    resolve(self);
                }).catch( (error) => {
                    console.log(error);
                    reject(error);
                });

            }
        });
    }

    dump(skip_readonly) {
        let data = {};
        let def  = this.definition();

        for( let k in this.properties ) {

            let is_readonly = def[k] instanceof Object && def[k].readOnly;

            if ( ! skip_readonly || ! is_readonly ) {
                let v = this.properties[k];

                if ( v instanceof Model || v instanceof ModelList ) {
                    data[k] = v.dump(skip_readonly);
                }
                else {
                    data[k] = v;
                }
            }
        }

        return data;
    }

    eq(model) {

        if ( 'id' in this.definition() ) {
            return this.id == model.id;
        }

        if ( Object.keys(this.dump()).length != Object.keys(model.dump()).length ) {
            return false;
        }

        for( let k in this.properties ) {
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

    static add_types(types) {
        Object.keys(types).forEach( (name) => {
            ModelTypes[name] = types[name];
        } );

        return ModelTypes;
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
                model.on('model-deleted', () => { self.remove(model); } );
            }
        }

        Emitter(this);
    }

    has(item) {

        let index = this.indexOf(item);

        return index >= 0 ? true : false;
    }

    push(item) {
        return this._mutate( (arr) => {
            if( ! (item instanceof Model) || ! this.has(item) ) {
              arr.push(item);
            }
        });
    }

    concat(items) {
        return this._mutate( (arr) => {
            items.forEach( (item) => {
                if( ! (item instanceof Model) || ! this.has(item) ) {
                  arr.push(item);
                }
            });
        });
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

    move(item,index) {
        let current_index = this.indexOf(item);

        // nothing to do, or trying to move something not present
        if ( current_index < 0 || index == current_index ) {
            return;
        }

        return this._mutate( (arr) => {
            arr.splice(current_index,1);
            arr.splice(index,0,item);
        });
    }

    pop() {
        if ( this.length ) {
            return this._mutate( (arr) => { return arr.pop() } );

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
        return this._mutate( (arr) => {
            if( ! (item instanceof Model) || ! this.has(item) ) {
                arr.unshift(item);
            }
        });
    }

    indexOf(item) {
        for ( let i=0; i<this.length; i++) {

            if ( item instanceof Model) {

                if ( this[i].id == item.id ) {
                    return i;
                }
            }
            else if ( this[i] == item ) {

                return i;
            }
        }

        return -1;
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

    dump(skip_readonly) {
        let arr = this._copy_items();

        for( let i=0; i < arr.length; i++ ) {

            if ( arr[i] instanceof Model ) {
                arr[i] = arr[i].dump(skip_readonly);
            }
        }

        return arr;
    }

    _mutate(mutate) {

        let arr = this._copy_items();

        let result = mutate.call(this,arr);
        let update = this._replaceList(arr);

        return result !== undefined ? result : update;
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
