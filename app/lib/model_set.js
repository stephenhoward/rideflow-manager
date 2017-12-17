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

        return new Models[type](params);
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
        var defer = $.Deferred();

        //if ( this.type.definition().id ) {

            if ( this.models[id] ) {
                defer.resolve( this.models[id] );
            }

            $.getJSON( this.type.url() + '/' + id )
                .done( (json) => {
                    this.models[id] = new this.type(json);
                    defer.resolve( this.models[id] );
                });
        //}
        //else {
        //    console.log( '"' + this.type.name + '" has no id to load by.')
        //    defer.reject();
        //}

        return defer.promise();
    }

    list(refresh) {
        let self = this;
        let defer = $.Deferred();

        if ( Object.keys( this.models ).length && ! refresh ) {
            defer.resolve( Object.values( this.models ) );
        }

        $.getJSON( this.type.url() )
            .done( (json) => {

                $.each(json, (i,item) => {
                    self.models[ item.id ] = new this.type(item);
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
};

module.exports = ModelSets;
