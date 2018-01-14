<style lang="sass" scoped>
ul {
    list-style-type: none;
    margin: 10px 0;
    padding: 0;    
}
</style>

<template>
    <aside :class="( mode == 'edit' ? 'editor ' : '' ) + 'model'">
        <div class="nav button-group">
            <button v-on:click="goBack" class="back"><span class="la la-angle-left"></span> {{ $t("nav_back") }}</button>
            <button v-if="mode == 'edit'" v-on:click="finishEditing" type="button" >{{ $t("done_editing") }}</button>
            <button v-else v-on:click="editItem" type="button" >{{ $t("edit_me") }}</button>
        </div>
        <div v-if="loading">
            {{ $t('loading') }}
        </div>
        <model-view v-else :model="model" :mode="mode"></model-view>
        <button v-if="mode == 'edit'" v-on:click="deleteItem" type="button" >{{ $t("delete_me", { type: type() } ) }}</button>
    </aside>
</template>

<script>

    export default {
        props: ['id'],
        data: function() {
            return {
                loading: false,
                model  : {},
                error  : null,
                mode: ''
            };
        },
        created: function() {
            this.fetchData(this.id);
        },
        beforeDestroy: function() {
            if ( this.mode == 'edit' ) {
                return false;
            }

        },
        methods: {
            fetchData: function(id) {
                let self = this;

                if ( id ) {
                    this.loading = true;
                    this.$models(this.type()).get(this.id).then( (model) => {
                        self.model   = model;
                        self.loading = false;
                    });
                }
                else {
                    this.model = new this.$new_model( this.type() );
                }
            },
            saveData: function() {
                let self = this;

                this.model.save().then( () => {
                    self.$models( this.type() ).add(this.model);
                });
            },
            cancelEdit: function() {
                this.model.revert();
                this.mode = '';
            },
            editItem() {
                this.mode = 'edit';
            },
            finishEditing() {
                this.mode = '';
                this.saveData();
            },
            goBack() {
                this.cancelEdit();
                this.$router.go(-1);
            },
            deleteItem() {
                let self = this;

                this.model.delete().then( () => {
                    self.$router.go(-1);
                })
            }
        },
        i18n: {
            messages: {
                en: {
                    loading: 'Loading...',
                    edit_me: 'Edit',
                    delete_me: 'Delete {type}',
                    nav_back: 'Back',
                    cancel_stop: 'Cancel',
                    stop_save: 'Save',
                    stop_create: 'Create Stop',
                    cancel: 'Cancel',
                    done_editing: 'Done'
                }
            }
        },
    };
</script>