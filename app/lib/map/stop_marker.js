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
        this.marker = L.marker(location,{draggable: true}).addTo(this.map);


        if ( ! this.stop.id ) {
            this.editPopup().showPopup();
        }
    }

    editPopup() {
        this.marker.bindPopup('<p>edit</p>');
        return this;
    }

    detailPopup() {
        this.marker.bindPopup('<p>view</p>');
        return this;
    }

    showPopup() {
        this.marker.openPopup();
        return this;
    }
}

module.exports = StopMarker;