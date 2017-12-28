</style>

<template>
    <aside class="editor edit_stop">
        <h2>
            <span aria-hidden="true" class="icon la la-map-marker"></span>
            <input type="text" v-model="model.name" v-bind:placeholder=" model.id ? $t('stop_name') : $t('new_stop_name') ">
        </h2>
        <div class="button-group">
            <button v-on:click="saveData" type="button" >{{ model.id ? $t("stop_save") : $t("stop_create") }}</button>
            <button v-on:click="cancelEdit" type="button">{{ $t("cancel") }}</button>
        </div>
    </aside>
</template>

<script>
    let EditVueMixin = require('../../lib/vue_mixins.js').EditVueMixin;

    export default {
        props: [ 'marker' ],
        mixins: [ EditVueMixin ],
        methods: {
            type: () => { return 'Stop' },
        },
        created() {
            if ( ! this.marker ) {
                this.$router.push('/');
            }
        },
        beforeDestroy() {
            if ( ! this.marker.id ) {
                this.marker.remove();
            }
        },
        i18n: {
            messages: {
                en: {
                    new_stop_name: 'Name of New Stop',
                    stop_name: 'Name of Stop',
                    stop_save: 'Save',
                    stop_create: 'Create Stop',
                    cancel: 'Cancel'
                }
            }
        }
    };
</script>
