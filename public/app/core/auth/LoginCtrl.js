angular.module('app.core')
  .controller('LoginCtrl', function($scope, $auth, IdentityService, ngDialog, toastr) {
    $scope.login = function() {
      $auth.login({ email: $scope.email, password: $scope.password })
        .then(function() {
          IdentityService.getCurrentUser();
          console.log('you have logged in');
          toastr.info('Login', 'Welcome back');
          ngDialog.closeAll();
//          $alert({
//            content: 'You have successfully logged in',
//            animation: 'fadeZoomFadeDown',
//            type: 'material',
//            duration: 3
//          });
        })
        .catch(function(response) {
          console.log(response.data.message);
//          $alert({
//            content: response.data.message,
//            animation: 'fadeZoomFadeDown',
//            type: 'material',
//            duration: 3
//          });
        });
    };
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          ngDialog.closeAll();
          IdentityService.getCurrentUser();
          console.log('you have successfully logged in ');
//          $alert({
//            content: 'You have successfully logged in',
//            animation: 'fadeZoomFadeDown',
//            type: 'material',
//            duration: 3
//          });
        })
        .catch(function(response) {
          console.log(response.data);
//          $alert({
//            content: response.data,
//            animation: 'fadeZoomFadeDown',
//            type: 'material',
//            duration: 3
//          });
        });
    };
  });