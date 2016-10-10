(function () {
  'use strict';
  angular.module('com.ionic.quickstart.directivas.next', [])
  .directive('next', function ($window) {
    return function (scope, element, attrs) {
      element.bind("keydown keypress", function(event) {
        if(event.which === 13) {
          event.preventDefault();
          var elementToFocus = element.next('fieldset').find('input')[0];
          if(angular.isDefined(elementToFocus)) elementToFocus.focus();
        }
      });
    };
  })
})();
