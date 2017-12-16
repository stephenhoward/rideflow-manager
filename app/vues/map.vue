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
    let RouteSession = require('../lib/models.js').RouteSession;
    let Route        = require('../lib/models.js').Route;

    export default {
        data: () => {

            return {
                map      : null,
                markers  : {}
            };
        },
        computed: {
            // sessions () {
            //     return RouteSession.fetch_all();
            // },
            routes () {
                return Route.fetch_all();               
            }
        },
        watch: {
            // sessions: {
            //     handler: function(newVehicles) {
            //         this.updateVehicles();
            //     },
            //     deep: true
            // },
            routes: {

            }
        },
        created: function() {
            var self = this;


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

                //RouteSession.fetch_all();
                Route.fetch_all();
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