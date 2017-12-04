window.Vue = require('vue');
window.VueRouter = require('vue-router');
window.VueI18n = require('vue-i18n');

require('./lib/authorize.js');

import { messages } from './lib/i18n.js';
import { routes   } from './lib/router.js';

const i18n   = new VueI18n({ messages, locale: 'en' });
const router = new VueRouter({ routes });

new Vue({ router, i18n }).mount('#rfapp');

if ( ! has_token() && window.app.$router.currentRoute && window.app.$router.currentRoute.path != '/login' ) {
    window.app.$router.push('/login');
}
