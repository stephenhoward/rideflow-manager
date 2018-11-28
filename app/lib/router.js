
let MenuLink = {
  render: (_c) => { return _c('router-link',{ attrs: { tag: 'button', class: "toggle la la-navicon", to: '/menu' } },[ _c('span',{ attrs: { class: 'sr-only' } },'menu') ] ); },
  data: () => {
    return {};
  }
};

let composeVue = require('./composeVue.js');
let ModelVue   = require('../vues/model.vue');
let ListVue    = require('../vues/list.vue');

let modelVue = (type) => {

    return _composeModelVue(type,ModelVue);
}

let modelListVue = (type) => {

    return _composeModelVue(type,ListVue);
}

let _composeModelVue = ( type, vue ) => {

    let component = Object.assign({},vue);
    let methods   = Object.assign({},component.methods);

    methods.type = () => { return type };
    component.methods = methods;

    return component;

}

module.exports = {

    routes : [
      { 
          path: '/', component: require('../vues/root.vue'),
          children: [
              { path: '',                component: MenuLink },
              { path: 'menu',            component: require('../vues/main_menu.vue')  },
              { path: 'routes',          component: composeVue( modelListVue('Route'), 'model-summary', '../vues/routes/route_summary.vue') },
              { path: 'routes/new',      component: composeVue( modelVue('Route'), 'model-view', '../vues/routes/route.vue'), props: true },
              { path: 'routes/:id',      component: composeVue( modelVue('Route'), 'model-view', '../vues/routes/route.vue'), props: true },

              { path: 'stops/new',      component: composeVue( modelVue('Stop'), 'model-vue', '../vues/stops/stop.vue'), name: 'new_stop', props: true },
              { path: 'stops/:id',      component: composeVue( modelVue('Stop'), 'model-vue', '../vues/stops/stop.vue' ), name: 'stop_details', props: true },

              { path: 'vehicles',          component: composeVue( modelListVue('Vehicle'), 'model-summary', '../vues/vehicles/vehicle_summary.vue') },
              { path: 'vehicles/new',      component: composeVue( modelVue('Vehicle'), 'model-view', '../vues/vehicles/vehicle.vue'), props: true },
              { path: 'vehicles/:id',      component: composeVue( modelVue('Vehicle'), 'model-view', '../vues/vehicles/vehicle.vue'), props: true },
          ]
      },
      { path: '/login',           component: require('../vues/auth/login.vue'),           name: 'login',           props: true },
      { path: '/password/forgot', component: require('../vues/auth/password_forgot.vue'), name: 'forgot_password', props: true },
      { path: '/password/reset_sent',   component: require('../vues/auth/password_reset_sent.vue'), name: 'reset_sent',     props: true },
      { path: '/password/reset/:token', component: require('../vues/auth/password_reset.vue'),      name: 'reset_password', props: true }
    ]
  };
