angular.module('app.core')
  .controller('LogoutCtrl', function($auth, IdentityService, toastr) {
    $auth.logout()
      .then(function() {
        IdentityService.logoutCurrentUser();
        console.log('you have been logged out');
        toastr.info('Logout', 'You have successfully logged out.');
//        $alert({
//          content: 'You have been logged out',
//          animation: 'fadeZoomFadeDown',
//          type: 'material',
//          duration: 3
//        });
      });
  });