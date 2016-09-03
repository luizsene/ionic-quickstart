/**
* @ngdoc directive
* @author Fábio Pereira <fabio.pereira.gti@gmail.com>
* @name com.ionic.quickstart.directivas.enter
* @restrict A
* @element textarea
* @element input
* @description
* Dispara uma função especificada quando a tecla enter é pressionada pelo usuário
*/
(function () {
  'use strict';
  angular.module('com.ionic.quickstart.directivas.enter', [])
  .directive(
    'enter', function () {
      return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
          if(event.which == 13) {
            scope.$apply(function (){
              scope.$eval(attrs.enter);
            });
            event.preventDefault();
          }
        });
      };
    })
  })();
