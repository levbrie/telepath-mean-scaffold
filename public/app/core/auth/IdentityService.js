(function() {
  'use strict';

  var appCore = angular.module('app.core');

  appCore.factory('IdentityService', function(User, $http, $q, $log, $auth) {
    var currentUser = {},
        endpoint = '/api/users/me';

    function getCurrentUser() {
      var deferred = $q.defer();

      if (currentUser.hasOwnProperty('role') || !$auth.isAuthenticated()) {
        deferred.resolve(currentUser);
      } else {
        $http.get(endpoint)
          .success(function(data, status, headers, config) {
            currentUser = new User();
            angular.extend(currentUser, data);
            $log.info('current user is now set');
            $log.info(data, status, headers, config);
            deferred.resolve(currentUser);
          })
          .error(function(data, status, headers, config) {
            $log.warn('user is not authenticated and not set');
            currentUser = {};
            $log.warn(data, status, headers, config);
            deferred.reject(data);
          });
      }
      return deferred.promise;
//      $http.get(endpoint)
//        .success(function(userData) {
//          currentUser = new User();
//          $log.info(currentUser);
//          angular.extend(currentUser, userData);
//          $log.info(userData);
//          $log.info(currentUser);
//          $log.info('user should now be set');
//          if ($auth.isAuthenticated()) {
//            $log.info('THE USER IS AUTHENTICATED');
//          }
//        })
//        .error(function() {
//          $log.warn('user is not currently authenticated');
//          currentUser = {};
//        });
    }

    function updateCurrentUser(accountData) {
      if (currentUser.hasOwnProperty('role')) {
        $http.put(endpoint, accountData);
      }
    }

    function logoutCurrentUser() {
      currentUser = {};
    }

    return {
      currentUser: function() {
        return currentUser;
      },
      getCurrentUser: getCurrentUser,
      updateCurrentUser: updateCurrentUser,
      logoutCurrentUser: logoutCurrentUser
    };

  });
}());