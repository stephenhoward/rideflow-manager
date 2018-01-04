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
    "route_session" : null,
    "timestamp" : '',
    "token" : null
});

let Route = Model.subclass( '/v1/routes', {
    "id" : '',
    "name" : '',
    "path" : [],
    "stops" : []
});

let RouteSession = Model.subclass( '/v1/sessions', {
    "bearing" : 0,
    "date_updated" : '',
    "driver" : null,
    "heading" : '',
    "id" : '',
    "location" : [],
    "rides" : [],
    "route" : null,
    "session_end" : '',
    "session_start" : '',
    "vehicle" : null

});

let Stop = Model.subclass( '/v1/stops', {
    "arrival" : null,
    "date_updated" : '',
    "id" : '',
    "location" : [],
    "name" : '',
    "routes" : []
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
    "sessions" : [],
    "type" : ''
});


module.exports = { Arrival, Pass, Ride, Route, RouteSession, Stop, User, Vehicle };