<template>
    <nav>
        <li>test</li>
        <li><router-link to="/routes">{{   $t( "routes.nav"   ) }}</router-link></li>
        <li><router-link to="/vehicles">{{ $t( "vehicles.nav" ) }}</router-link></li>
        <li><router-link to="/drivers">{{  $t( "drivers.nav"  ) }}</router-link></li>
        <li><router-link to="/rides">{{    $t( "rides.nav"    ) }}</router-link></li>
    </nav>
</template>

<script>
    export default {
        name: 'main_menu',
        data: () => {
            return {}
        }
    };
</script>