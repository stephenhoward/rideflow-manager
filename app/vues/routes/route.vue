<style lang="sass" scoped>
ul {
    list-style-type: none;
    margin: 10px 0;
    padding: 0;    
}
</style>

<template>
    <aside class="route">
        <div class="nav button-group">
            <button v-on:click="goBack" class="back"><span class="la la-angle-left"></span> {{ $t("nav_back") }}</button>
            <button v-on:click="editItem" type="button" >{{ $t("edit_me") }}</button>
        </div>
        <h2><span aria-hidden="true" class="la la-map"></span> {{ model.name }}</h2>
        <ul>
            <stop-summary v-for="stop in model.stops" :key="stop.id" :model="stop"></stop-summary>
        </ul>    

        <button v-on:click="addStop" type="button" >{{ $t("add_stop") }}</button>
        <button v-on:click="deleteItem" type="button" >{{ $t("delete_me") }}</button>
    </aside>
</template>

<script>
    let ModelVueMixin = require('../../lib/vue_mixins.js').ModelVueMixin;

    export default {
        mixins: [ ModelVueMixin ],
        methods: {
            type: () => { return 'Route' },
            editItem() {
                this.$router.push('/route/' + this.model.id + '/edit' );
            },
            goBack() {
                this.$router.go(-1);
            },
            deleteItem() {
                let self = this;

                this.model.delete().done( () => {
                    self.$router.go(-1);
                })
            },
            addStop() {
                this.model
            }
        },
        i18n: {
            messages: {
                en: {
                    edit_me: 'Edit',
                    delete_me: 'Delete Route',
                    nav_back: 'Back',
                    add_stop: 'Add a Stop'
                }
            }
        },
        components: {
            'stop-summary': require ('./stop_summary.vue')
        }
    };
</script>