angular.module('app.core').directive('lvNavbar', lvNavbar);

function lvNavbar () {
  var directive = {
    restrict: 'E',
    templateUrl: '/partials/core/nav/navbar.html',
    link: link
  };
  return directive;

  function link(scope, element, attrs) {

  }
};

