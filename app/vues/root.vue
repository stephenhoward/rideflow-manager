<template>
    <div class="root">
        <header>
            <router-view></router-view>
            <nav>
                <li><router-link to="/routes">{{   $t( "routes.nav"   ) }}</router-link></li>
                <li><router-link to="/vehicles">{{ $t( "vehicles.nav" ) }}</router-link></li>
                <li><router-link to="/drivers">{{  $t( "drivers.nav"  ) }}</router-link></li>
                <li><router-link to="/rides">{{    $t( "rides.nav"    ) }}</router-link></li>
            </nav>
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
        }
    }
</script>