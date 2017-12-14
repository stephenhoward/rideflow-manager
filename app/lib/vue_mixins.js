
module.exports = {

    ListVueMixin: {
        data: () => {
            return {
                loading : false,
                models  : [
                ],
                error   : null
            };            
        },
        created: function() {
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            type: function() { return null },
            url:  function() { return ''   },

            add: function() {
                this.$router.push( this.url() + '/new' );
            },
            fetchData: function() {
                let defer = $.Deferred();
                let type  = this.type().all().done( (items) => {
                    this.models = items;
                    defer.resolve(items);
                });

                return defer.promise();
            }
        }
    },

    EditVueMixin: {
        props: ['id'],
        data: function() {
            return {
                loading: false,
                model  : null,
                error  : null
            };
        },
        created: function() {
            this.fetchData();
        },
        watch: {
           '$route': 'fetchData' 
        },
        methods: {
            fetchData: function() {
                let defer = $.Deferred();
                if ( ! this.model ) {
                    let type = this.type();
                    this.model = new type({});
                    if ( this.id ) {
                        type.load( '/v1' + this.url() + '/'+this.id).done( (model) => {
                            this.model = model;
                            defer.resolve(this.model);
                        });
                    }
                }
                else {
                    defer.resolve(this.model);
                }
                return defer.promise();
            },
            saveData: function() {
                if ( this.model.id ) {
                    this.model.save( '/v1' + this.url() + '/' + this.model.id );
                }
                else {
                    this.model.save( '/v1' + this.url() );
                }
            }
        }
    }
}
