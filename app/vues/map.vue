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
                    this.updateStopMarkers(stops);
                },
                deep: true
            }
        },
        created: function() {
            let self = this;

            self.$models('Route').list().then((routes) => {
                self.routes = {};
                for( let i = 0; i < routes.length; i++ ) {
                    self.routes[ routes[i].id ] = routes[i];
                }
            });
            self.$models('Stop').list().then((stops) => {
                for( let i = 0; i < stops.length; i++ ) {
                    let stop = stops[i];

                    this.stops.push(stop);

                    stop.on('model-deleted', () => {
                        this.stops = this.stops.filter( (item) => { return stop.id != item.id } );
                    });
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
                    stop.on('model-deleted', () => {
                        self.stops = self.stops.filter( (item) => { return stop.id != item.id } );
                    });
                });
            });
        },
        methods: {
            
            updateStopMarkers(stops) {
                if ( ! stops ) {
                    stops = this.stops;
                }
                let existing_markers = Object.assign({},this.markers);

                for( let i = 0; i < stops.length; i++ ) {

                    let stop = stops[i];
                    let id   = stop.id || '';

                    if ( ! ( id in this.markers ) ) {
                        this.markers[ id ] = new StopMarker(this.$map,stop);
                    }

                    delete existing_markers[ id ];
                }

                for( let id in existing_markers ) {

                    existing_markers[id].remove();
                    delete this.markers[id];
                }
            }
        }
    };
    
</script>