
let MenuLink = {
  render: (_c) => { return _c('router-link',{ attrs: { tag: 'button', class: "toggle la la-navicon", to: '/menu' } },[ _c('span',{ attrs: { class: 'sr-only' } },'menu') ] ); },
  data: () => {
    return {};
  }
};

module.exports = {

     routes : [
      { 
          path: '/', component: require('../vues/root.vue'),
          children: [
              { path: '',                component: MenuLink },
              { path: 'menu',            component: require('../vues/main_menu.vue')  },
              { path: 'routes',          component: require('../vues/routes/routes.vue') },
              { path: 'routes/new',      component: require('../vues/routes/route_edit.vue') },
              { path: 'routes/:id',      component: require('../vues/routes/route.vue'), props: true },
              { path: 'routes/:id/edit', component: require('../vues/routes/route_edit.vue'), props: true },

              { path: 'stops/new',      component: require('../vues/stops/stop_edit.vue'), name: 'new_stop', props: true },
              { path: 'stops/:id',      component: require('../vues/stops/stop.vue'), name: 'stop_details', props: true },
              { path: 'stops/:id/edit', component: require('../vues/stops/stop.vue'), props: true },

              { path: 'vehicles',          component: require('../vues/vehicles/vehicles.vue') },
              { path: 'vehicles/new',      component: require('../vues/vehicles/vehicle_edit.vue') },
              { path: 'vehicles/:id',      component: require('../vues/vehicles/vehicle.vue'), props: true },
              { path: 'vehicles/:id/edit', component: require('../vues/vehicles/vehicle_edit.vue'), props: true }
              // { path: 'routes/new', component: rfEditRoute },
              // { path: 'drivers',  component: Drivers },
              // { path: 'rides',    component: Rides }
          ]
      },
      { path: '/login',           component: require('../vues/auth/login.vue'),           name: 'login',           props: true },
      { path: '/password/forgot', component: require('../vues/auth/password_forgot.vue'), name: 'forgot_password', props: true },
      { path: '/password/reset_sent', component: require('../vues/auth/password_reset_sent.vue'), name: 'reset_sent', props: true }
    ]
  };
