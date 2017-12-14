<style lang="sass" scoped>
    div.root {
        display: grid;
        align-self: stretch;
        justify-self: stretch;
    }
    aside {
        position: absolute;
        top: 15px;
        right: 15px;
        z-index: 5;

        button.toggle {
            padding: 4px 8px;
            box-shadow: 5px 5px 5px rgba(100,100,100,.5);
            color: white;
            border: none;
            background-color: #fa6;
            border-radius: 15px;
            font-size: 14pt;
            font-weight: 700;
            float: right;
            &:focus {
                outline: none;
            }
            & + * {
                clear: right;
            }
        }
        &.open {
            margin: 15px;
            padding: 10px;
            min-width: 200px;
            box-shadow: 5px 5px 5px rgba(100,100,100,.5);
            border-radius: 8px;
            border: 1px solid #ccc;
            background-color: white;
            button.toggle {
                color: #aaa;
                box-shadow: none;
                background-color: transparent;
            }
        }
    }
</style>

<template>
    <div class="root">
        <aside>
            <button class="toggle" v-on:click="toggleOverlay">+</button>
            <router-view></router-view>
        </aside>

        <routemap></routemap>
    </div>
</template>

<script>
    Vue.component('routemap', require('./map.vue') );
    export default {
        data: () => {
            return {};
        },
        mounted: function () {
            this.toggleOverlay();
        },
        methods: {
            toggleOverlay: function() {
                let route = window.app.$router.currentRoute;

                if ( ! route || route.path == '/' ) {
                    window.app.$router.push('/menu');
                    $('div.root aside').addClass('open');
                }
                else {
                    window.app.$router.push('/');                    
                    $('div.root aside').removeClass('open');
                }

            }
        }
    }
</script>