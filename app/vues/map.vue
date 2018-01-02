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
    const StopMarker = require('../lib/map/stop_marker.js');

    export default {
        data: () => {

            return {
                map     : null,
                stops   : [],
                routes  : {},
                markers : {}
            };
        },
        watch: {
            'stops': {
                handler: function(stops) {
                    this.updateStopMarkers();
                },
                deep: true
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
                for( let i = 0; i < stops.length; i++ ) {
                    let stop = stops[i];

                    this.stops.push(stop);
                }
                this.updateStopMarkers();
            });

        },
        mounted: function() {

            let self = this;

            this.$nextTick( () => {

                self.$map = L.map('transitmap').setView( config.map.coordinates, config.map.zoom );

                self.$map.addLayer( L.tileLayer(config.map.tiles, {
                    attribution: config.map.attribution,
                    maxZoom: 18,
                    id: config.map.view,
                    accessToken: config.map.token
                }) );

                self.$map.on('click', (e) => {
                    if ( ! self.$map.mode ) {
                        self.$router.push('/');
                    }
                });
                $(self.$map).on('add-stop', (e,stop) => {
                    self.stops.push(stop);
                });
            });
        },
        methods: {
            
            updateStopMarkers() {
                let existing_markers = Object.assign({},this.markers);

                for( let i = 0; i < this.stops.length; i++ ) {

                    let stop = this.stops[i];

                    if ( ! ( stop.id in this.markers ) ) {
                        this.markers[ stop.id ] = new StopMarker(this.$map,stop);
                    }

                    delete existing_markers[ stop.id ];
                }

                for( let i = 0; i < existing_markers.length; i++ ) {

                    existing_markers[i].remove();
                }
            }
        }
    };
    
</script>