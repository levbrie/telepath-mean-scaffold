(function() {
  'use strict';

  var appCore = angular.module('app.core');
  appCore.controller('AuthCtrl', function($scope, $log, $auth, IdentityService, ngDialog) {
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    if ($auth.isAuthenticated()) {
      var userPromise = IdentityService.getCurrentUser();
      $log.info(userPromise);
      userPromise.then(function(data) {
        $scope.currentUser = data;
        $log.info('current user set in AuthCtrl');
        $log.info(data);
        $log.info('identity service current user is:');
        $log.info(IdentityService.currentUser());
        $log.info($scope.identity.currentUser());
      });
    } else {
      $scope.currentUser = {};
    }

    $scope.identity = IdentityService;

    $scope.displaySignup = function() {

    };

    $scope.displayLogin = function() {
      ngDialog.open({
        template: '/partials/core/auth/login.html',
        className: 'ngdialog-theme-lv',
        controller: 'LoginCtrl',
        scope: $scope
      });
    };

    $scope.signout = function() {
      $auth.logout()
        .then(function() {
          IdentityService.logoutCurrentUser();
          $log.info('successfully logged out');
        });
    };
  });
}());