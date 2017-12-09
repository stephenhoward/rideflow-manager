<template>
    <div class="root">
        <header>
            <button v-on:click="toggleOverlay">Toggle</button>
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
                }
                else {
                    window.app.$router.push('/');                    
                }

            }
        }
    }
</script>