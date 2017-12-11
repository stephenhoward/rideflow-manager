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

    export default {
        data: () => {

            return {
                map      : null,
                routes   : [],
                markers  : {}
            };
        },
        watch: {
            routes: {
                handler: function(newVehicles) {
                    this.updateVehicles();
                },
                deep: true
            }
        },
        mounted: function() {

            this.$nextTick( () => {

                this.map = L.map('transitmap').setView( config.map.coordinates, config.map.zoom );

                L.tileLayer(config.map.tiles, {
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    maxZoom: 18,
                    id: config.map.view,
                    accessToken: config.map.token
                }).addTo(this.map);

                var lat = config.map.coordinates[0];
                var lon = config.map.coordinates[1];
                this.routes = [ new RouteSession({ latitude: lat, longitude: lon, id: 'test' }) ];

            });
        },
        methods: {
            updateVehicles: function() {
                let self = this;

                if ( ! self.map ) {
                    return;
                }

                $.each(self.routes,function(i,vehicle) {
                    if ( self.markers[ vehicle.id ] ) {
                        self.markers[ vehicle.id ].setLatLng( [ vehicle.latitude, vehicle.longitude ] );
                    }
                    else {
                        self.markers[ vehicle.id ] = L.marker([ vehicle.latitude, vehicle.longitude ]).addTo(self.map);
                    }
                });
            }
        }
    };
    
</script>