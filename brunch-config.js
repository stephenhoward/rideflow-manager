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
        },
        sass: {
            options:  {
                allowCache: true,
                sourceMapEmbed: true
            }
        },
        copycat: {
            "images": ["node_modules/leaflet/dist/images"],
            onlyChanged: true
        }
    },
    npm: {
        enabled: true,
        styles: {
            leaflet: ["dist/leaflet.css"]
        }
    },
    conventions: {
        ignored: /^test\/*/
    }
};
