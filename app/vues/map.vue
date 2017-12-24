<style lang="sass" scoped>
    main#transitmap {
        z-index: 1;
        align-self: stretch;
        justify-self: stretch;
    }
</style>

<template>
    <main id="transitmap">
        <div class="edit_stop template">
            <input >
            <button>Ok</button>
            <button>Cancel</button>
        </div>
    </main>
</template>

<script>
    const config     = require('../lib/config.js');
    const StopMarker = require('../lib/map/stop_marker.js');

    export default {
        data: () => {

            return {
                map    : null,
                stops  : {},
                routes : {}
            };
        },
        watch: {
            // sessions: {
            //     handler: function(newVehicles) {
            //         this.updateVehicles();
            //     },
            //     deep: true
            // },
            stops: {


            }
        },
        created: function() {
            let self = this;

            self.$models('Route').list().done((routes) => {
                self.routes = {};
                for( let i = 0; i < routes.length; i++ ) {
                    self.routes[ routes[i].id ] = routes[i];
                }
            });
            self.$models('Stop').list().done((stops) => {
                self.stops = {};
                for( let i = 0; i < stops.length; i++ ) {
                    self.stops[ stops[i].id ] = stops[i];
                }
            });
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

                self.map.on('click', (e) => {

                    new StopMarker(self.map,e.latlng);
                });
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