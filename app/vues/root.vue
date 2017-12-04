<style lang="sass">
.template {
    display: none;
}

#rfapp {
    width: 100%;
    display: grid;
    min-height: 100%;
    div.login, div.forgot_password {
        padding: 20px 15px;
        max-width: 300px;
        border: 1px solid #ccc;
        border-radius: 4px;
        align-self: center;
        justify-self: center;
        display: grid;
        grid-columns-template: 1fr;
        grid-row-gap: 8px;
        h3 {
            margin: 0;
        }
        input {
            display: block;
        }
        button {
            justify-self: center;
        }
        a {
            display: block;
            justify-self: right;
        }

    }
}
</style>

<template>
    <div class="root">
        <header>
            <nav>
                <li><router-link to="/routes">{{   $t( "routes.nav"   ) }}</router-link></li>
                <li><router-link to="/vehicles">{{ $t( "vehicles.nav" ) }}</router-link></li>
                <li><router-link to="/drivers">{{  $t( "drivers.nav"  ) }}</router-link></li>
                <li><router-link to="/rides">{{    $t( "rides.nav"    ) }}</router-link></li>
            </nav>
        </header>
        <main>
            <router-view></router-view>
            <div id="testmap" style="height: 400px;">
            </div>
        </main>
        <footer>
        </footer>
    </div>
</template>

<script>
    export default {
        data () {

        }
    }
</script>