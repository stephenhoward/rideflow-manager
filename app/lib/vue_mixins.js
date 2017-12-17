module.exports = {

    ListVueMixin: {
        data: () => {
            return {
                loading : false,
                error   : null,
                models  : []
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

            add: function() {
                let currentPath = this.$router.currentRoute.path;
                this.$router.push(  currentPath + '/new' );
            },
            fetchData: function() {
                this.$models(this.type()).list().done( (models) => {
                    this.models = models
                });
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
        methods: {
            fetchData: function(id) {
                if ( id ) {
                    this.$models(this.type()).load(this.id).done( (model) => {
                        this.model = model;
                    });
                }
                else {
                    this.model = new this.$new_model( this.type() );
                }
            },
            saveData: function() {
                let self = this;

                this.model.save().done( () => {
                    self.$models( this.type() ).add(this.model);
                    self.$router.go(-1);
                });
            }
        }
    }
}
