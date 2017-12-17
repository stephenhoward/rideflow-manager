
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

    save() {
        var defer = $.Deferred();
        var self  = this;
        $.ajax({
            url         : self.constructor.url(),
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

}

module.exports = Model;
