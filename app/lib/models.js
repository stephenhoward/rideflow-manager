let Model = require('./model.js');


class Arrival extends Model {
    definition() {
        return {
            "minutes" : 0,
            "name" : ''
        };

    }

    get minutes()    { return this._get('minutes');      }
    set minutes(val) { return this._set('minutes',val);  }
    
    get name()    { return this._get('name');      }
    set name(val) { return this._set('name',val);  }
    



}

class Pass extends Model {
    definition() {
        return {
            "class" : '',
            "date_expires" : '',
            "date_issued" : '',
            "duration" : 0,
            "duration_type" : '',
            "guest_id" : '',
            "id" : '',
            "rides" : 0,
            "rides_remaining" : 0
        };

    }

    get class()    { return this._get('class');      }
    set class(val) { return this._set('class',val);  }
    
    get date_expires()    { return this._get('date_expires');      }
    set date_expires(val) { return this._set('date_expires',val);  }
    
    get date_issued()    { return this._get('date_issued');      }
    set date_issued(val) { return this._set('date_issued',val);  }
    
    get duration()    { return this._get('duration');      }
    set duration(val) { return this._set('duration',val);  }
    
    get duration_type()    { return this._get('duration_type');      }
    set duration_type(val) { return this._set('duration_type',val);  }
    
    get guest_id()    { return this._get('guest_id');      }
    set guest_id(val) { return this._set('guest_id',val);  }
    
    get id()    { return this._get('id');      }
    set id(val) { return this._set('id',val);  }
    
    get rides()    { return this._get('rides');      }
    set rides(val) { return this._set('rides',val);  }
    
    get rides_remaining()    { return this._get('rides_remaining');      }
    set rides_remaining(val) { return this._set('rides_remaining',val);  }
    



}

class Ride extends Model {
    definition() {
        return {
            "bearing" : 0,
            "class" : '',
            "heading" : '',
            "id" : '',
            "location" : [],
            "pass_type" : '',
            "route_session" : null,
            "timestamp" : '',
            "token" : null
        };

    }

    get bearing()    { return this._get('bearing');      }
    set bearing(val) { return this._set('bearing',val);  }
    
    get class()    { return this._get('class');      }
    set class(val) { return this._set('class',val);  }
    
    get heading()    { return this._get('heading');      }
    set heading(val) { return this._set('heading',val);  }
    
    get id()    { return this._get('id');      }
    set id(val) { return this._set('id',val);  }
    
    get location()    { return this._get('location');      }
    set location(val) { return this._set('location',val);  }
    
    get pass_type()    { return this._get('pass_type');      }
    set pass_type(val) { return this._set('pass_type',val);  }
    
    get route_session()    { return this._get('route_session');      }
    set route_session(val) { return this._set('route_session',val);  }
    
    get timestamp()    { return this._get('timestamp');      }
    set timestamp(val) { return this._set('timestamp',val);  }
    
    get token()    { return this._get('token');      }
    set token(val) { return this._set('token',val);  }
    



}

class Route extends Model {
    definition() {
        return {
            "id" : '',
            "name" : '',
            "path" : [],
            "stops" : []
        };

    }

    static url() {
        return '/v1/routes';
    }


    get id()    { return this._get('id');      }
    set id(val) { return this._set('id',val);  }
    
    get name()    { return this._get('name');      }
    set name(val) { return this._set('name',val);  }
    
    get path()    { return this._get('path');      }
    set path(val) { return this._set('path',val);  }
    
    get stops()    { return this._get('stops');      }
    set stops(val) { return this._set('stops',val);  }
    



}

class RouteSession extends Model {
    definition() {
        return {
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
        };

    }

    static url() {
        return '/v1/sessions';
    }

    get bearing()    { return this._get('bearing');      }
    set bearing(val) { return this._set('bearing',val);  }
    
    get date_updated()    { return this._get('date_updated');      }
    set date_updated(val) { return this._set('date_updated',val);  }
    
    get driver()    { return this._get('driver');      }
    set driver(val) { return this._set('driver',val);  }
    
    get heading()    { return this._get('heading');      }
    set heading(val) { return this._set('heading',val);  }
    
    get id()    { return this._get('id');      }
    set id(val) { return this._set('id',val);  }
    
    get location()    { return this._get('location');      }
    set location(val) { return this._set('location',val);  }
    
    get rides()    { return this._get('rides');      }
    set rides(val) { return this._set('rides',val);  }
    
    get route()    { return this._get('route');      }
    set route(val) { return this._set('route',val);  }
    
    get session_end()    { return this._get('session_end');      }
    set session_end(val) { return this._set('session_end',val);  }
    
    get session_start()    { return this._get('session_start');      }
    set session_start(val) { return this._set('session_start',val);  }
    
    get vehicle()    { return this._get('vehicle');      }
    set vehicle(val) { return this._set('vehicle',val);  }
    



}

class Stop extends Model {
    definition() {
        return {
            "arrival" : null,
            "date_updated" : '',
            "id" : '',
            "location" : [],
            "name" : '',
            "routes" : []
        };

    }

    get arrival()    { return this._get('arrival');      }
    set arrival(val) { return this._set('arrival',val);  }
    
    get date_updated()    { return this._get('date_updated');      }
    set date_updated(val) { return this._set('date_updated',val);  }
    
    get id()    { return this._get('id');      }
    set id(val) { return this._set('id',val);  }
    
    get location()    { return this._get('location');      }
    set location(val) { return this._set('location',val);  }
    
    get name()    { return this._get('name');      }
    set name(val) { return this._set('name',val);  }
    
    get routes()    { return this._get('routes');      }
    set routes(val) { return this._set('routes',val);  }
    



}

class User extends Model {
    definition() {
        return {
            "firstname" : '',
            "id" : '',
            "lastname" : ''
        };

    }

    get firstname()    { return this._get('firstname');      }
    set firstname(val) { return this._set('firstname',val);  }
    
    get id()    { return this._get('id');      }
    set id(val) { return this._set('id',val);  }
    
    get lastname()    { return this._get('lastname');      }
    set lastname(val) { return this._set('lastname',val);  }
    



}

class Vehicle extends Model {
    definition() {
        return {
            "id" : '',
            "name" : '',
            "notes" : '',
            "sessions" : [],
            "type" : ''
        };

    }

    static url() {
        return '/v1/vehicles';
    }

    get id()    { return this._get('id');      }
    set id(val) { return this._set('id',val);  }
    
    get name()    { return this._get('name');      }
    set name(val) { return this._set('name',val);  }
    
    get notes()    { return this._get('notes');      }
    set notes(val) { return this._set('notes',val);  }
    
    get sessions()    { return this._get('sessions');      }
    set sessions(val) { return this._set('sessions',val);  }
    
    get type()    { return this._get('type');      }
    set type(val) { return this._set('type',val);  }
    



}


module.exports = { Arrival, Pass, Ride, Route, RouteSession, Stop, User, Vehicle };