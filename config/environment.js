'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'ember-task-management',
    environment,
    firebase:{
    apiKey: "AIzaSyC--SD3ebvWq9JO31ArTDMDLT4wr9wMhvw",
    authDomain: "personal-task-manager-762dc.firebaseapp.com",
    databaseURL: "https://personal-task-manager-762dc.firebaseio.com",
    projectId: "personal-task-manager-762dc",
    storageBucket: "personal-task-manager-762dc.appspot.com",
    messagingSenderId: "652838834216"
  },
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
