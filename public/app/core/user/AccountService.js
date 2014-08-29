angular.module('app.core')
  .factory('Account', function($http, $auth) {
    return {
      getProfile: function() {
        return $http.get('/api/me');
      },
      updateProfile: function(profileData) {
        return $http.put('/api/me', profileData).success(function(data) {
          $auth.updateToken(data.token);
        });
      }
    };
  });