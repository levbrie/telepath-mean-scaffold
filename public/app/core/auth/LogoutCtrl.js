angular.module('app.core')
  .controller('LogoutCtrl', function($auth, IdentityService) {
    $auth.logout()
      .then(function() {
        IdentityService.logoutCurrentUser();
        console.log('you have been logged out');
//        $alert({
//          content: 'You have been logged out',
//          animation: 'fadeZoomFadeDown',
//          type: 'material',
//          duration: 3
//        });
      });
  });