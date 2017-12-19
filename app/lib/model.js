
class Model {
    constructor(properties) {
        this.properties = {};
        this.dirty      = {};

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
            if ( this.properties[k] !== v ) {

                // capture the original value
                if ( ! k in this.dirty ) {

                    this.dirty[k] = this.properties[k];
                }
                // looks like we're reverting to the original value
                else if ( this.dirty[k] === v ) {

                    delete this.dirty[k];
                }

                this.properties[k] = v;

                $(this).trigger('model-changed');
            }

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

    revert() {
        let keys_changed = Object.keys( this.dirty );

        for( let k in this.dirty ) {
            this.properties[k] = this.dirty[k];
            delete dirty[k];
        }

        if ( keys_changed ) {
            $(this).trigger('model-changed');
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
            data        : JSON.stringify(self.properties)
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
                $(self).trigger('model-deleted');
                defer.resolve(self);
            }).fail( (json) => {
                defer.reject(json);
            });

        }

        return defer.promise();
    }

}

module.exports = Model;
