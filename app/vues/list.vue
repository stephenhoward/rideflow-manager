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
        <h2>{{ $t( "title", { type: type() } ) }}</h2>
        <div class="nav button-group">
            <router-link to="/menu" tag="button" class="back"><span class="la la-angle-left"></span> {{ $t("nav_back") }}</router-link>
            <button v-on:click="add" v-bind:title="$t('add_title', { type: type() })"type="button"><span class="la la-plus"></span></button>
        </div>

        <ul>
            <model-summary v-for="model in models" :key="model.id" :model="model"></model-summary>
        </ul>    
    </aside>
</template>

<script>
    export default {
        data: () => {
            return {
                loading : false,
                error   : null,
                models  : []
            };
        },
        created: function() {
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            type: function() { return null },

            add: function() {
                let currentPath = this.$router.currentRoute.path;
                this.$router.push(  currentPath + '/new' );
            },
            fetchData: function() {
                let self = this;

                this.$models(this.type()).list().done( (models) => {
                    self.models = models;
                });
            }
        },
        i18n: {
            messages: {
                en: {
                    title: '{type}s',
                    add_title: 'Create a {type}',
                    nav_back: 'Back'
                }
            }
        }
    };
</script>