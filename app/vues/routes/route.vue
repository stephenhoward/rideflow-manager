<template>
    <aside class="route">
        <a href="#" v-on:click="goBack">&lt; {{ $t("nav_back") }}</a>
        <h3>{{ model.name }}</h3>
        <ul>
            <stop-summary v-for="stop in model.stops" :key="stop.id" :model="stop"></stop-summary>
        </ul>    

        <button v-on:click="addStop" type="button" >{{ $t("add_stop") }}</button>
        <button v-on:click="editItem" type="button" >{{ $t("edit_me") }}</button>
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
                    edit_me: 'Edit Route',
                    delete_me: 'Delete Route',
                    nav_back: 'back',
                    add_stop: 'Add a Stop'
                }
            }
        },
        components: {
            'stop-summary': require ('./stop_summary.vue')
        }
    };
</script>