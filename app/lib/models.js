let Model = require('./model.js');


let Arrival = Model.subclass( '', {
    "minutes" : 0,
    "name" : ''
});

let Pass = Model.subclass( '', {
    "class" : '',
    "date_expires" : '',
    "date_issued" : '',
    "duration" : 0,
    "duration_type" : '',
    "guest_id" : '',
    "id" : '',
    "rides" : 0,
    "rides_remaining" : 0
} );

let Ride = Model.subclass( '', {
    "bearing" : 0,
    "class" : '',
    "heading" : '',
    "id" : '',
    "location" : [],
    "pass_type" : '',
    "route_session" : {
        type: 'RouteSession'
    },
    "timestamp" : '',
    "token" : {
        type: 'Pass'
    }
});

let Route = Model.subclass( '/v1/routes', {
    "id" : '',
    "name" : '',
    "color": '',
    "path" : [],
    "stops" : {
        type    : 'Array',
        items   : 'Stop'
    }
});

let RouteSession = Model.subclass( '/v1/sessions', {
    "bearing" : 0,
    "date_updated" : '',
    "driver" : {
        type: 'User'
    },
    "heading" : '',
    "id" : '',
    "location" : [],
    "rides" : {
        type: 'Array',
        items: 'Ride'
    },
    "route" : {
        type: 'Route'
    },
    "session_end" : '',
    "session_start" : '',
    "vehicle" : {
        type: 'Vehicle'
    }

});

let Stop = Model.subclass( '/v1/stops', {
    "arrival" : {
        type: 'Arrival'
    },
    "date_updated" : '',
    "id" : '',
    "location" : [],
    "name" : '',
    "routes" : {
        type: 'Array',
        items: 'Route'
    }
});

let User = Model.subclass( '', {
    "firstname" : '',
    "id" : '',
    "lastname" : ''
});

let Vehicle = Model.subclass( '/v1/vehicles', {
    "id" : '',
    "name" : '',
    "notes" : '',
    "sessions" : {
        type: 'Array',
        items: 'RouteSession'
    },
    "type" : ''
});


let types = { Arrival, Pass, Ride, Route, RouteSession, Stop, User, Vehicle };

Model.add_types( types );

module.exports = types;

