const Models  = require('./models.js');
const axios = require('axios');

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

        return new Promise( (resolve,reject) => {

            if ( self.models[id] ) {
                resolve( self.models[id] );
            }
            else {
                axios.get( this.type.url() + '/' + id, {
                    responseType : 'json',
                })
                    .then( (response) => {
                        let json = response.data;

                        self.models[id] = self._new(json);
                        resolve( this.models[id] );
                    })
                    .catch( (error) => {
                        // TODO
                    });
            }
        });
    }

    list(refresh) {
        let self  = this;

        return new Promise( (resolve,reject) => {

            if ( Object.keys( this.models ).length && ! refresh ) {
                resolve( Object.values( this.models ) );
            }

                axios.get( this.type.url(), {
                    responseType : 'json',
                })
                    .then( (response) => {
                        let json = response.data;

                        json.forEach( (item) => {
                            self.models[ item.id ] = self._new(item);
                        })

                        resolve( Object.values( this.models ) );
                    })
                    .catch( (error) => {
                        // TODO
                    });
        });
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

        model
            .on('model-deleted', function() {
                model.off();

                delete self.models[ this.id ];
            })
            .on('model-updated', function() {
                // probably useful in the future
            });

        return model;
    }
};

module.exports = ModelSets;
