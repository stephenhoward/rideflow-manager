let Stop = require('../models.js').Stop;

class StopMarker {
    constructor(map,stop) {
        let location = null;

        if ( stop instanceof Stop ) {

            this.stop = stop;
            location  = {
                lat: stop.location[0],
                lng: stop.location[1]
            };
        }
        else if ( stop instanceof Array ) {

            this.stop = new Stop({ location: stop });
            location  = {
                lat: stop[0],
                lng: stop[1]
            };
        }
        else if ( stop.lat && stop.lng ) {
            this.stop = new Stop({ location: [stop.lat,stop.lng] });
            location  = stop;
        }

        if ( ! location ) {
            throw 'no location for marker provided';
        }

        this.map    = map;
        this.marker = L.marker( location, {
            draggable : true,
            icon      : L.divIcon({ className: 'stop-marker' })
        }).addTo(this.map);

        let self = this;

        this.on('click', (e) => {

            if ( map.mode == 'AddStop' ) {

                map.resolveMode(self.stop);
            }
        });
        this.on('moveend', (e) => {

            self.moveTo( self.marker.getLatLng() );
        });

    }

    get id() {
        return this.stop.id || null;
    }

    get stop() {
        return this._stop || null;
    }

    set stop(s) {
        this._stop = s;
        return this.stop;
    }

    remove() {
        this.marker.remove();
    }

    on(event,handler) {

        this.marker.on(event,handler);

        return this;
    }

    off(event,handler) {
        this.marker.off(event,handler);

        return this;
    }

    moveTo(latlng) {

        this.marker.setLatLng(latlng);
        this.stop.location = [ latlng.lat, latlng.lng ];

        if ( this.stop.id ) {
            this.stop.save();
        }
    }

}

module.exports = StopMarker;