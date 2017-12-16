let Vuex = require('vuex');
window.Vue.use(Vuex);


// store models fetched from the server centrally in a way that vue can notice changes:
let store =  new Vuex.Store({
    state: {
        models: {}
    },
    getters: {
    },
    mutations: {
        setList: ( state, options ) => {
            state.models[ options.type ] = options.list;
        },
        addModel: ( state, options ) => {
            if ( ! state[ options.type ] ) {
                state[ options.type ] = [];
            }
        }

    },
    actions: {

    }
});

class Model {
    constructor(properties) {
        this.properties = {};
        for( let k of Object.keys(this.definition()) ) {
            if ( k in properties ) {
                this.properties[k] = properties[k];
            }
        }
    }

    definition() {
        return {};
    }

    _set(k,v) {
        if ( k in this.definition() ) {
            this.properties[k] = v;

            return this.properties[k];
        }
        return null;
    }

    _get(k) {
        if ( k in this.definition() ) {
            return this.properties[k];
        }
        return null;
    }

    save(url) {
        var defer = $.Deferred();
        var self  = this;
        $.ajax({
            url         : url,
            type        : 'POST',
            dataType    : 'json',
            contentType : 'application/json; charset=utf-8',
            data        : JSON.stringify(self.properties)
        }).done( (json) => {
            for( let k of Object.keys(json) ) {
                self._set(k,json[k]);
            }
            defer.resolve(self);
        });

        return defer.promise();
    }

    static load(url) {
        var defer = $.Deferred();

        if( model_cache[url] ) {
            return defer.resolve( model_cache[url] );
        }

        $.getJSON(url)
            .done( (json) => {
                model_cache[url] = new this(json);
                defer.resolve( model_cache[url] );
            });

        return defer.promise();
    }

    static list(url) {
        var defer = $.Deferred();
        $.getJSON(url)
            .done( (json) => {

                defer.resolve( json.map( (item) => {
                    return new this(item);
                }) );
            });

        return defer.promise();
    }

    static fetch_all(refresh) {
        var defer = $.Deferred();

        let type = this.name;

        if ( ! store.state.models[type] || refresh ) {

            if ( ! store.state.models[type]) {

                store.commit('setList',{ type, list: [] });
            }
            this.list( this.url() ).done((list) => {
                store.commit('setList',{ type, list: list });
                defer.resolve(list);
            });
        }

        return store.state.models[type];
    }

}

module.exports = { Model, store };
