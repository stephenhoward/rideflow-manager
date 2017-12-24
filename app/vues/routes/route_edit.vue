<template>
    <div class="edit_route">
        <input type="text" v-model="model.name" v-bind:placeholder="$t('route_name')">
        <button v-on:click="saveData" type="button" >{{ $t("route_create") }}</button>
        <button v-on:click="cancelEdit" type="button">{{ $t("cancel") }}</button>
    </div>
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
                    vehicle_name: 'Route Name',
                    vehicle_create: 'Create Route',
                    cancel: 'Cancel'
                }
            }
        }
    };
</script>
