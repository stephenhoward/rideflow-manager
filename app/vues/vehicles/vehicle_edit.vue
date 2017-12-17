<template>
    <div class="edit_vehicle">
        <input type="text" v-model="model.name" v-bind:placeholder="$t('vehicle_name')">
        <button v-on:click="saveData" type="button" >{{ $t("vehicle_create") }}</button>
        <button v-on:click="cancelEdit" type="button">{{ $t("cancel") }}</button>
    </div>
</template>

<script>
    let EditVueMixin = require('../../lib/vue_mixins.js').EditVueMixin;

    export default {
        mixins: [ EditVueMixin ],
        methods: {
            type: () => { return 'Vehicle' },
        },
        i18n: {
            messages: {
                en: {
                    vehicle_name: 'Vehicle Name',
                    vehicle_create: 'Add Vehicle',
                    cancel: 'Cancel'
                }
            }
        }
    };
</script>
