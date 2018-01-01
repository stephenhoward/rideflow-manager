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
                map     : null,
                stops   : [],
                routes  : {},
                markers : {}
            };
        },
        watch: {
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
            });
        },
        methods: {
            
            newStop(latlng) {

                if ( this.current_marker && ! this.current_marker.id ) {

                    this.current_marker.moveTo(latlng);
                }
                else {

                    let marker = new StopMarker( this.$map, latlng );

                    this.current_marker = marker;

                    marker
                        .on('click',(e) => {
                            if ( marker.id ) {

                                this.$router.push({ name: 'stop_details', params: { id:  marker.id } });
                            }
                        })
                        .on('remove', (e) => {
                            this.current_marker = null;
                        });
                }

                this.$router.push({
                    name: 'new_stop',
                    params: {
                        marker: this.current_marker
                    }
                });
            }
        }
    };
    
</script>