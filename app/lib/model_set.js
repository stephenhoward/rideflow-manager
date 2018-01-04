let Models = require('./models.js');

function ModelSets() {

    return this;
}
ModelSets.sets = {};

ModelSets.install = (Vue, options) => {

    Vue.prototype.$models = function(type) {

        if ( ! ModelSets.sets[type] ) {
            ModelSets.sets[type] = new ModelSet(type);
        }

        return ModelSets.sets[type];
    }

    Vue.prototype.$new_model = function(type,params) {

        if ( ! type in Models ) {
            console.log( '"' + type + '" is not a valid model type');
            return undefined;
        }

        if ( ! params ) {
            params = {};
        }

        let set = Vue.prototype.$models(type);
        let model = new Models[type](params);

        if ( model.id ) {
            set.add(model);
        }
        else {
            model.on('model-save', () => {
                if ( model.id ) {
                    set.add(model);
                }
            });
        }

        return model;
    }
};

class ModelSet {
    constructor(type) {

        if ( type in Models ) {
            this.type = Models[type];
        }
        else {
            console.log( '"' + type + '" is not a valid model type');
        }

        this.models = {};
    }

    get(id) {
        let self  = this;
        let defer = $.Deferred();

        if ( this.models[id] ) {
            defer.resolve( this.models[id] );
        }
        else {
            $.getJSON( this.type.url() + '/' + id )
                .done( (json) => {
                    self.models[id] = self._new(json);
                    defer.resolve( this.models[id] );
                });
        }

        return defer.promise();
    }

    list(refresh) {
        let self  = this;
        let defer = $.Deferred();

        if ( Object.keys( this.models ).length && ! refresh ) {
            defer.resolve( Object.values( this.models ) );
        }

        $.getJSON( this.type.url() )
            .done( (json) => {

                $.each(json, (i,item) => {
                    self.models[ item.id ] = self._new(item);
                })

                defer.resolve( Object.values( this.models ) );
            });

        return defer.promise();
    }

    add(model) {
        if ( ! model.constructor ) {
        }
        if ( ! model.constructor.name in Models ) {

        }

        this.models[ model.id ] = model;
    }

    _new(item) {
        let self  = this;
        let model = new this.type(item);

        $(model)
            .on('model-deleted', function() {
                $(this).off();

                delete self.models[ this.id ];
            })
            .on('model-updated', function() {
                // probably useful in the future
            });

        return model;
    }
};

module.exports = ModelSets;
