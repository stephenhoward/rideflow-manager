module.exports = {

     routes : [
      { 
          path: '/', component: rfRoot,
          children: [
              { path: 'routes', component: rfRoutes },
              { path: 'routes/new', component: rfEditRoute },
              { path: 'routes/:id/edit', component: rfEditRoute, props: true },
              { path: 'vehicles', component: rfVehicles },
              { path: 'vehicles/new', component: rfEditVehicle },
              { path: 'vehicles/:id', component: rfVehicle, props: true },
              { path: 'vehicles/:id/edit', component: rfEditVehicle, props: true },
              { path: 'drivers',  component: Drivers },
              { path: 'rides',    component: Rides }
          ]
      },
      { path: '/login', component: LoginVue, name: 'login', props: true },
      { path: '/password/forgot',     component: PasswordForgotVue,    name: 'forgot_password', props: true },
      { path: '/password/reset_sent', component: PasswordResetSentVue, name: 'reset_sent',      props: true }
    ]
  };
