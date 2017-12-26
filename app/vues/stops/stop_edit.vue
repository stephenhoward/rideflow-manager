<template>
    <div class="edit_stop">
        <input type="text" v-model="model.name" v-bind:placeholder="$t('stop_name')">
        <button v-on:click="saveData" type="button" >{{ $t("stop_create") }}</button>
        <button v-on:click="cancelEdit" type="button">{{ $t("cancel") }}</button>
    </div>
</template>

<script>
    let EditVueMixin = require('../../lib/vue_mixins.js').EditVueMixin;

    export default {
        props: [ 'marker' ],
        mixins: [ EditVueMixin ],
        methods: {
            type: () => { return 'Stop' },
        },
        beforeDestroy() {
            if ( ! this.marker.id ) {
                this.marker.remove();
            }
        },
        i18n: {
            messages: {
                en: {
                    stop_name: 'Name of Stop',
                    stop_create: 'Create Stop',
                    cancel: 'Cancel'
                }
            }
        }
    };
</script>
