angular.module('app.core')
  .factory('AuthService', AuthService);

function AuthService ($location, $rootScope, $http, $q, $cookieStore, User) {
  var Auth = {};
  Auth.currentUser = {};
  if ($cookieStore.get('token')) {
    Auth.currentUser = User.get();
  }

  Auth.login = function (user, callback) {

  };

  Auth.logout = function () {

  };

  Auth.createUser = function (user, callback) {

  };

  Auth.changePassword = function () {

  };

  return Auth;
}