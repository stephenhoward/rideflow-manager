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
                let self = this;

                this.$models(this.type()).list().done( (models) => {
                    self.models = models
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
            this.fetchData(this.id);
        },
        methods: {
            fetchData: function(id) {
                let self = this;

                if ( id ) {
                    this.$models(this.type()).get(this.id).done( (model) => {
                        self.model = model;
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
            },
            cancelEdit: function() {
                this.model.revert();
                this.$router.go(-1);
            }
        }
    },

    ModelVueMixin: {
        props: ['id'],
        data: function() {
            return {
                loading: false,
                model  : null,
                error  : null
            };
        },
        created: function() {
            this.fetchData(this.id);
        },
        methods: {
            fetchData: function(id) {
                let self = this;

                if ( id ) {
                    this.$models(this.type()).get(this.id).done( (model) => {
                        self.model = model;
                    });
                }
                else {
                    this.model = new this.$new_model( this.type() );
                }
            }
        }
    }
}
