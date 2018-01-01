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
        <model-view :model="model" :mode="mode"></model-view>
        <div v-if="mode == 'edit'" class="button-group">
            <button v-on:click="saveData" type="button" >{{ model.id ? $t("stop_save") : $t("stop_create") }}</button>
            <button v-on:click="cancelEdit" type="button">{{ $t("cancel") }}</button>
        </div>
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
        methods: {
            fetchData: function(id) {
                let self = this;

console.log(this.type());
                if ( id ) {
                    this.$models(this.type()).get(this.id).done( (model) => {
                        if ( this.type() == 'Route' ) {
                            model.stops.push( this.$new_model('Stop',{ name: '3rd and Main', location: [44,-128] }) );
                            model.stops.push( this.$new_model('Stop',{ name: 'Elm and Broad', location: [44,-126] }) );
                            model.stops.push( this.$new_model('Stop',{ name: 'City Hall', location: [44,-126] }) );
                        }
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
                this.$router.go(-1);
            },
            deleteItem() {
                let self = this;

                this.model.delete().done( () => {
                    self.$router.go(-1);
                })
            }
        },
        i18n: {
            messages: {
                en: {
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