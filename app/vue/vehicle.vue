<template>
    <div class="edit_vehicle">
    <input type="text" v-model="model.name" v-bind:placeholder="$t('vehicle.name')">
    <button v-on:click="saveData" type="button" >{{ $t("vehicle.create") }}</button>
    </div>
</template>

<script>
    import EditVueMixin from '../js/lib/vue_mixins';
    export default {
        template: ht('div.edit_vehicle'),
        mixins: [ EditVueMixin ],

        methods: {
            type: () => { return Vehicle },
            url:  () => { return '/vehicles' }
        }
    };
</script>