<template>
    <aside class="editor edit_vehicle">
        <h2>
            <span aria-hidden="true" class="icon la la-bus"></span>
            <input type="text" v-model="model.name" v-bind:placeholder=" model.id ? $t('vehicle_name') : $t('new_vehicle_name') ">
        </h2>
        <div class="button-group">
            <button v-on:click="saveData" type="button" >{{ model.id ? $t("vehicle_save") : $t("vehicle_create") }}</button>
            <button v-on:click="cancelEdit" type="button">{{ $t("cancel") }}</button>
        </div>
    </aside>
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
                    new_vehicle_name: 'New Vehicle Name',
                    vehicle_create: 'Add Vehicle',
                    vehicle_save: 'Save',
                    cancel: 'Cancel'
                }
            }
        }
    };
</script>
