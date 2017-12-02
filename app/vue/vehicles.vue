<template>
    <div class="vehicles">
        <h2>{{ $t( "vehicles.title" ) }}</h2>
        <button v-on:click="add" v-bind:title="$t('vehicles.add_title')"type="button">+</button>
        <ul>
            <vehicle-summary v-for="model in models" :key="model.id" :model="model"></vehicle-summary>
        </ul>    
    </div>
 
</template>

<script>
    import ListVueMixin from '../js/lib/vue_mixins';
    export default {
        mixins: [ ListVueMixin ],

        methods: {
            type: () => { return Vehicle },
            url:  () => { return '/vehicles' }
        }
    }
</script>