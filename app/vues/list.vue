<style lang="sass" scoped>
    aside {

        ul {
            list-style-type: none;
            font-size: 12pt;
            margin: 15px -10px;
            padding: 0;
            li {
                padding: 6px 10px;
                margin: 6px 0;            
                cursor: pointer;
                border-top: 1px solid #ddd;
                &:last-child {
                    border-bottom: 1px solid #ddd;
                }
                &:hover {
                    background: rgba(200,200,200,.3);
                }
            }
        }
    }
</style>

<template>
    <aside>
        <h2>{{ $t( "title" ) }}</h2>
        <div class="nav button-group">
            <router-link to="/menu" tag="button" class="back"><span class="la la-angle-left"></span> {{ $t("nav_back") }}</router-link>
            <button v-on:click="add" v-bind:title="$t('add_title')"type="button"><span class="la la-plus"></span></button>
        </div>

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