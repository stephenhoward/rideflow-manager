let model_cache = {};

class Model {
    constructor(properties) {
        this.properties = {};
        for( let k of Object.keys(this.definition()) ) {
            if ( properties[k] ) {
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

    static all(refresh) {
        var defer = $.Deferred();

        if ( ! this._records || refresh ) {

            this._records = this.list( this.url() ).done((list) => {
                this._records = list;
                defer.resolve(list);
            });
        }
        else {
            defer.resolve(this._records);
        }

        return defer.promise();
    }

}

module.exports = Model;
