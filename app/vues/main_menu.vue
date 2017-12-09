<template>
    <nav>
        <li>test</li>
        <li><router-link to="/routes">{{   $t( "routes.nav"   ) }}</router-link></li>
        <li><router-link to="/vehicles">{{ $t( "vehicles.nav" ) }}</router-link></li>
        <li><router-link to="/drivers">{{  $t( "drivers.nav"  ) }}</router-link></li>
        <li><router-link to="/rides">{{    $t( "rides.nav"    ) }}</router-link></li>
        <li><a v-on:click="doLogout">{{ $t("logout") }}</a></li>
    </nav>
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