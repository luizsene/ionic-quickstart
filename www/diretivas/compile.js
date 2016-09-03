/**
* @ngdoc directive
* @author Fábio Pereira <fabio.pereira.gti@gmail.com>
* @name com.ionic.quickstart.directivas.compile
* @restrict A
* @description
* Compila html oriundo, em elementos DOM lincados (imprime texto como html)
*/
(function () {
  'use strict';
  angular.module('com.ionic.quickstart.directivas.compile', [])
  .directive('compile',['$compile', function ($compile) {
      return function (scope, element, attrs) {
        scope.$watch(
          function (scope) {
            return scope.$eval(attrs.compile);
          },
          function (value) {
            element.html(value);
            $compile(element.contents())(scope);
          }
        );
      };
    }])
  })();
