describe('Directive: Auth Widget lvAuthWidget', function() {
  var $compile, $controller, $rootScope, element, scope, mockAuthCtrl;
  beforeEach(module('app'));
  beforeEach(module('/partials/core/auth/auth-widget.html'));
  beforeEach(module(function($controllerProvider) {
    $controllerProvider.register('AuthCtrl', function($scope) {
      // Controller Mock
      this.isAuthenticated = false;
      $scope.isAuthenticated = function() {
        return false;
      };
      $scope.identity = {
        currentUser: function() {
          return {
            isAdmin: function() {
              return true;
            },
            google: {
              picture: 'googleurl'
            },
            displayName: 'Bob Jones'
          }
        }
      };
    });
  }));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$controller_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
    $controller = _$controller_;
    scope = $rootScope.$new();
    AuthCtrl = $controller('AuthCtrl', {$scope: scope});
    element = angular.element('<lv-auth-widget></lv-auth-widget>');
    $compile(element)(scope);
    scope.$digest();
  }));

  describe('when not authenticated', function() {
    it('should display a link to login', function() {
      expect(element.html()).toContain('ng-click="displayLogin()">Login</a>');
    });
  });

  // describe('when not authenticated', function() {
  //   it('should display a link to the dashboard', function() {
  //     expect(element.html()).toContain('Dashboard');
  //   });
  // });
});
