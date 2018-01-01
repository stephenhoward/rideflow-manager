<style lang="sass" scoped>
    button.toggle {
        align-self: flex-end;
        & + * {
            clear: both;
        }
        border: none;
        padding: 6px;
        background: none;
    }
    nav {
        list-style-type: none;
        font-size: 12pt;
        li {
            padding: 3px 0;
            margin: 6px 0;            
            a {
                text-decoration: none;
                color: black;
                cursor: pointer;
            }
        }
    }
</style>

<template>
    <aside>
    <router-link tag="button" to="/" class="toggle la la-remove"><span class="sr-only">close menu</span></router-link>
    <nav>
        <li><router-link to="/routes"><span aria-hidden="true" class="icon la la-map"></span> {{   $t( "routes.nav"   ) }}</router-link></li>
        <li><router-link to="/vehicles"><span aria-hidden="true" class="icon la la-bus"></span> {{ $t( "vehicles.nav" ) }}</router-link></li>
        <li><router-link to="/drivers"><span aria-hidden="true" class="icon la la-user"></span> {{  $t( "drivers.nav"  ) }}</router-link></li>
        <li><router-link to="/rides"><span aria-hidden="true" class="icon la la-bar-chart"></span> {{    $t( "rides.nav"    ) }}</router-link></li>
        <li><a v-on:click="doLogout"><span aria-hidden="true" class="icon la la-power-off"></span> {{ $t("logout") }}</a></li>
    </nav>
    </aside>
</template>

<script>
    const authorize = require('../lib/authorize.js');

    export default {
        name: 'main_menu',
        data: () => {
            return {}
        },
        methods: {
            doLogout: function() {
                authorize.logout();
                window.app.$router.push('/login');
            }
        }
    };
</script>