
module.exports = {

     routes : [
      { 
          path: '/', component: require('../vues/root.vue'),
          children: [
              { path: 'menu',     component: require('../vues/main_menu.vue')  },
              { path: 'routes',   component: require('../vues/routes/routes.vue') },
              { path: 'vehicles', component: require('../vues/vehicles/vehicles.vue') },
              { path: 'vehicles/new', component: require('../vues/vehicles/vehicle_edit.vue') },
              { path: 'vehicles/:id/edit', component: require('../vues/vehicles/vehicle_edit.vue'), props: true }
              // { path: 'routes/new', component: rfEditRoute },
              // { path: 'routes/:id/edit', component: rfEditRoute, props: true },
              // { path: 'vehicles/:id', component: rfVehicle, props: true },
              // { path: 'drivers',  component: Drivers },
              // { path: 'rides',    component: Rides }
          ]
      },
      { path: '/login',           component: require('../vues/auth/login.vue'),           name: 'login',           props: true },
      { path: '/password/forgot', component: require('../vues/auth/password_forgot.vue'), name: 'forgot_password', props: true },
      { path: '/password/reset_sent', component: require('../vues/auth/password_reset_sent.vue'), name: 'reset_sent', props: true }
    ]
  };
