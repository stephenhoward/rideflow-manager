module.exports = {
    files: {
        javascripts: {
            joinTo: 'app.js'
        },
        stylesheets: {
            joinTo: 'vendor.css'
        }
    },
    plugins: {
        vue: {
            extractCSS: true,
            out: './public/app.css'
        }
    },
    npm: {
        enabled: true,
        styles: {
            leaflet: ["dist/leaflet.css"]
        }
    }
};