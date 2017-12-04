module.exports = {
    files: {
        javascripts: {
            joinTo: 'app.js'
        },
    },
    plugins: {
        vue: {
            extractCSS: true,
            out: './public/app.css'
        }
    }
};