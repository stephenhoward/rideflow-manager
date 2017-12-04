window.Vue       = require('vue');
window.VueRouter = require('vue-router');
window.VueI18n   = require('vue-i18n');

let authorize = require('./lib/authorize.js');

window.app = new Vue({
    router : new VueRouter({
        routes   : require('./lib/router.js').routes
    }),
    i18n   : new VueI18n({
        messages : require('./lib/i18n.js').messages,
        locale   : 'en'
    })

}).$mount('#rfapp');

if ( ! authorize.has_token() && window.app.$router.currentRoute && window.app.$router.currentRoute.path != '/login' ) {
    window.app.$router.push('/login');
}
