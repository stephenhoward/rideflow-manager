module.exports = {
    map: {
        // MAPBOX:
        tiles : 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
        view  : 'mapbox.streets',
        token : 'your.access.token',

        coordinates : [ 44.85307, -123.2151 ],
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
        zoom: 14

    }
}