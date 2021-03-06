window.Vue    = require('vue');
let VueRouter = require('vue-router');
let VueI18n   = require('vue-i18n');

let authorize   = require('./lib/authorize.js');
let ModelSets   = require('./lib/model_set.js');
let RideFlowMap = require('./lib/map.js');
let App         = require('./vues/app.vue');

Vue.use(ModelSets);
Vue.use(RideFlowMap);

let DragDrop = require('vue-drag-drop');
Vue.component( 'drag', DragDrop.Drag );
Vue.component( 'drop', DragDrop.Drop );

window.app = new Vue({
    render: h => h(App),
    router : new VueRouter({
        routes   : require('./lib/router.js').routes
    }),
    i18n   : new VueI18n({
        messages : require('./lib/i18n.js').messages,
        locale   : 'en'
    }),
    models : new ModelSets(),
    map    : new RideFlowMap()
});

app.$mount('#rfapp');

let $router = window.app.$router;

if ( ! authorize.has_token() && $router.currentRoute
 && ! ( $router.currentRoute.name == 'login' || $router.currentRoute.name == 'reset_password' ) ) {
    $router.push({ name: 'login' });
}
