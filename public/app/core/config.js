(function () {
  'use strict';

  var core = angular.module('app.core');

  var clientIds = {
    facebook: '689050897814697',
    google: '155132075923-u7kk1hoe82hgb9aha1esr8g0ujnopl6o.apps.googleusercontent.com',
    github: '0ba2600b1dbdb756688b',
    linkedin: '77cw786yignpzj',
    foursquare: 'MTCEJ3NGW2PNNB31WOSBFDSAD4MTHYVAZ1UKIULXZ2CVFC2K'
  };

  core.config(function ($locationProvider, $routeProvider, $authProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: '/partials/layout/main.html'
      })
      .when('/login', {
        templateUrl: '/partials/core/auth/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: '/partials/core/auth/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/logout', {
        template: null,
        controller: 'LogoutCtrl'
      })
      .when('/profile', {
        templateUrl: '/partials/core/user/profile.html',
        controller: 'ProfileCtrl',
        protected: true

      })
      .otherwise({
        redirectTo: '/'
      });

    $authProvider.facebook({
      clientId: clientIds.facebook
    });

    $authProvider.google({
      clientId: clientIds.google
    });

    $authProvider.github({
      clientId: clientIds.github
    });

    $authProvider.linkedin({
      clientId: clientIds.linkedin
    });

    $authProvider.twitter({
      url: '/auth/twitter'
    });

    $authProvider.oauth2({
      name: 'foursquare',
      url: '/auth/foursquare',
      clientId: clientIds.foursquare,
      redirectUri: window.location.origin,
      authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate'
    });
  });

  core.run(function Run($auth, $log, IdentityService) {
    if ($auth.isAuthenticated()) {
      $log.info('getting current user');
      IdentityService.getCurrentUser();
    } else {
      $log.warn('user not authenticated');
    }
  });
})();
