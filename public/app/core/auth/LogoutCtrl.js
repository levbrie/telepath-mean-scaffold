angular.module('app.core')
  .controller('LogoutCtrl', function($auth) {
    $auth.logout()
      .then(function() {
        console.log('you have been logged out');
//        $alert({
//          content: 'You have been logged out',
//          animation: 'fadeZoomFadeDown',
//          type: 'material',
//          duration: 3
//        });
      });
  });