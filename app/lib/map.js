const Models     = require('./models.js');
const StopMarker = require('./map/stop_marker.js');

// needed by map.vue, but brunch won't grab it from a .vue file
window.L      = require('leaflet');

function RideFlowMap() {

    return this;
}

RideFlowMap.modes = {
    'AddStop'   : true,
    'DrawRoute' : true
};

RideFlowMap.extendMap = (map) => {

    Object.defineProperty(map, 'mode', {
        set: function(mode) {
            if ( mode in RideFlowMap.modes || mode == '' ) {
                map._mode = mode;
            }
            else {
                console.log(mode + ' is not a valid mode');
            }

            return map.mode;
        },
        get: function() {
            return map._mode || null;
        }
    });

    map.addStopToRoute = (route) => {

        let defer = $.Deferred();

        map.mode = 'AddStop';

        let addStop = (e) => {

            let marker = new StopMarker( map, e.latlng );

            route.stops.push( marker.stop );

            map.off('click',addStop);
            map.mode = '';
            defer.resolve(marker);
        }

        map.on('click', addStop );

        return defer.promise();
    };

};

RideFlowMap.install = (Vue, options) => {

    Object.defineProperty(Vue.prototype, '$map', {
        set: function set (v) {
            RideFlowMap.extendMap(v);
            RideFlowMap.current_map = v;
            return RideFlowMap.current_map;
        },
        get: function get () { return RideFlowMap.current_map }
    });

};

module.exports = RideFlowMap;
