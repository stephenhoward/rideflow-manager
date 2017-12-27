<style lang="sass" scoped>
    ul {
        list-style-type: none;
        font-size: 12pt;
        li {
            padding: 3px 0;
            margin: 6px 0;            
        }
    }
</style>

<template>
    <aside>
        <router-link to="/menu">&lt; {{ $t("nav_back") }}</router-link>
        <h2>{{ $t( "title" ) }}</h2>

        <button v-on:click="add" v-bind:title="$t('add_title')"type="button">+</button>
        <ul>
            <model-summary v-for="model in models" :key="model.id" :model="model"></model-summary>
        </ul>    
    </aside>
</template>

<script>
    let ListVueMixin = require('../../lib/vue_mixins.js').ListVueMixin;

    export default {
        mixins: [ ListVueMixin ],
    };
</script>