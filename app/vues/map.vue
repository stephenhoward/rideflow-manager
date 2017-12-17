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
    const config     = require('../lib/config.js');

    export default {
        data: () => {

            return {
                map      : null,
                markers  : {},
                routes   : []
            };
        },
        watch: {
            // sessions: {
            //     handler: function(newVehicles) {
            //         this.updateVehicles();
            //     },
            //     deep: true
            // },
            // routes: {

            // }
        },
        created: function() {
            let self = this;

            self.$models('Route').list().done((routes) => { self.routes = routes });
        },
        mounted: function() {

            let self = this;

            this.$nextTick( () => {

                self.map = L.map('transitmap').setView( config.map.coordinates, config.map.zoom );

                L.tileLayer(config.map.tiles, {
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    maxZoom: 18,
                    id: config.map.view,
                    accessToken: config.map.token
                }).addTo(self.map);
            });
        },
        methods: {
            updateVehicles: function() {
                let self = this;

                if ( ! self.map ) {
                    return;
                }

                $.each(self.sessions,function(i,vehicle) {
                    if ( self.markers[ vehicle.id ] ) {
                        self.markers[ vehicle.id ].setLatLng( vehicle.location );
                    }
                    else {
                        self.markers[ vehicle.id ] = L.marker( vehicle.location ).addTo(self.map);
                    }
                });
            }
        }
    };
    
</script>