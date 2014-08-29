function AuthInterceptor ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) { // that is, we have a user token
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    responseError: function (response) {
      if (response.status === 401) {
        $location.path('/login');
        // remove session storage token
        if ($window.sessionStorage.token) {
          delete $window.sessionStorage.token;
        }
      }
      return $q.reject(response); // send back whatever the error response was
    }
  };
}