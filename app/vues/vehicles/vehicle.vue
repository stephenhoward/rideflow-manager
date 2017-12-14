<i18n>
{
    en: {
        name: 'vehicle identifier',
        create: 'add vehicle',
        update: 'save changes'
    }
}
</i18n>

<template>
    <div class="edit_vehicle">
    <input type="text" v-model="model.name" v-bind:placeholder="$t('name')">
    <button v-on:click="saveData" type="button" >{{ $t("create") }}</button>
    </div>
</template>

<script>
    import EditVueMixin from '../js/lib/vue_mixins';
    export default {
        mixins: [ EditVueMixin ],

        methods: {
            type: () => { return Vehicle },
            url:  () => { return '/vehicles' }
        }
    };
</script>