<template>
    <aside class="editor edit_route">
        <h2>
            <span class="icon la la-map" aria-hidden="true"></span>
            <input type="text" v-model="model.name" v-bind:placeholder=" model.id ? $t('route_name') : $t('new_route_name') ">
        </h2>
        <div class="button-group">
            <button v-on:click="saveData" type="button" >{{ model.id ? $t("route_save") : $t("route_create") }}</button>
            <button v-on:click="cancelEdit" type="button">{{ $t("cancel") }}</button>
        </div>
    </aside>
</template>

<script>
    let EditVueMixin = require('../../lib/vue_mixins.js').EditVueMixin;

    export default {
        mixins: [ EditVueMixin ],
        methods: {
            type: () => { return 'Route' },
        },
        i18n: {
            messages: {
                en: {
                    route_name: 'Route Name',
                    new_route_name: 'New Route Name',
                    route_create: 'Create Route',
                    route_save: 'Save',
                    cancel: 'Cancel'
                }
            }
        }
    };
</script>
