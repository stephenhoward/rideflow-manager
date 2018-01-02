const Models     = require('./models.js');
const StopMarker = require('./map/stop_marker.js');

// needed by map.vue, but brunch won't grab it from a .vue file
window.L      = require('leaflet');

function RideFlowMap() {

    return this;
}

RideFlowMap.modes = {
    'AddStop'   : null,
    'DrawRoute' : null
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


RideFlowMap.extendMap = (map) => {

    Object.defineProperty(map, 'mode', {
        get: function() {
            return map._mode || null;
        }
    });

    let invalidMode = (mode) => { console.log('"' + mode + '"" is not a valid mode') };

    map.setMode = (mode,defer) => {

        if ( mode in RideFlowMap.modes ) {
            map._mode = mode;
        }
        else {
            invalidMode(mode);
        }

        let old_defer = RideFlowMap.modes[mode];

        if ( old_defer ) {
            old_defer.reject();
        }

        RideFlowMap.modes[mode] = defer || null;

        return map.mode;
    };
    map.clearMode = (mode) => {

        let defer = null;
        if ( mode in RideFlowMap.modes ) {
            map._mode = '';
            defer = RideFlowMap.modes[mode];
            RideFlowMap.modes[mode] = null;
        }
        else {
            invalidMode(mode);
        }

        return defer;
    };
    map.cancelMode = (mode) => {
        if ( mode in RideFlowMap.modes ) {
            map._mode = '';
            if ( RideFlowMap.modes[mode] ) {
                RideFlowMap.modes[mode].reject();
            }
            RideFlowMap.modes[mode] = null;
        }
        else {
            invalidMode(mode);
        }
    };

    let addStop = (e) => {

        let stop = new Models.Stop({ location: [e.latlng.lat,e.latlng.lng] });

        let defer  = map.clearMode(map.mode);

        map.off('click',addStop);

        if ( defer ) {
            defer.resolve(stop);
        }
        
        $(map).trigger('add-stop', stop);
    }

    map.addStop = () => {

        let defer = $.Deferred();

        map.setMode('AddStop',defer);

        map.on('click', addStop );

        return defer.promise();
    };

    map.cancelAddStop = () => {

        map.off('click',addStop);
        map.cancelMode(map.mode);
    }

};

module.exports = RideFlowMap;
