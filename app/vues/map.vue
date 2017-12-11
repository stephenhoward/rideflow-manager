<style lang="sass" scoped>
    main#transitmap {
        z-index: 1;
        align-self: stretch;
        justify-self: stretch;
    }
</style>

<template>
    <main id="transitmap"></main>
</template>

<script>
    const config = require('../lib/config.js');

    export default {
        data: () => {

            return {
                map: null
            };
        },
        created: function() {
            let self = this;
            setTimeout(function(){

            self.map = L.map('transitmap').setView( config.map.coordinates, config.map.zoom );

            L.tileLayer(config.map.tiles, {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                maxZoom: 18,
                id: config.map.view,
                accessToken: config.map.token
            }).addTo(self.map);
            },1000);
        },
    };
    
</script>