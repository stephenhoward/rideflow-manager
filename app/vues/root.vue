<style lang="sass">
    header {
        float: right;
        margin: 15px;
        padding: 10px;
        button.toggle {
            padding: 4px 8px;
            background-color: red;
            border: none;
            color: #fff;
            border-radius: 10px;
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
    }
    header.open {
        box-shadow: 5px 5px 5px rgba(100,100,100,.5);
        border-radius: 8px;
        border: 1px solid #ccc;
        background-color: white;
        button.toggle {
            color: #aaa;
            background-color: transparent;
        }
    }
</style>

<template>
    <div class="root">
        <header>
            <button class="toggle" v-on:click="toggleOverlay">+</button>
            <router-view></router-view>
        </header>

        <main>
            <routemap></routemap>
        </main>
    </div>
</template>

<script>
    Vue.component('routemap', require('./map.vue') );
    export default {
        data: () => {
            return {};
        },
        methods: {
            toggleOverlay: function() {
                let route = window.app.$router.currentRoute;

                if ( ! route || route.path == '/' ) {
                    window.app.$router.push('/menu');
                    $('header').addClass('open');
                }
                else {
                    window.app.$router.push('/');                    
                    $('header').removeClass('open');
                }

            }
        }
    }
</script>