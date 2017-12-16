window.Vue    = require('vue');
let VueRouter = require('vue-router');
let VueI18n   = require('vue-i18n');

// needed by map.vue, but brunch won't grab it from a .vue file
window.L      = require('leaflet');

let authorize = require('./lib/authorize.js');
let App       = require('./vues/app.vue');
let store     = require('./lib/model.js').store;

window.app = new Vue({
    render: h => h(App),
    router : new VueRouter({
        routes   : require('./lib/router.js').routes
    }),
    i18n   : new VueI18n({
        messages : require('./lib/i18n.js').messages,
        locale   : 'en'
    }),
    store: store
});

app.$mount('#rfapp');

if ( ! authorize.has_token() && window.app.$router.currentRoute && window.app.$router.currentRoute.path != '/login' ) {
    window.app.$router.push('/login');
}
