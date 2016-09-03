/**
* @ngdoc directive
* @name com.ionic.quickstart.directivas.lazyBack
* @author Fábio Pereira <fabio.pereira.gti@gmail.com>
* @restrict A
* @scope
* @element img
* @description
* Exibe o load enquanto uma imagem é carregado do servidor, caso ocorra um erro uma imagem de erro é colocada no local da imagem que seria carregada
*/
(function () {
  'use strict';
  angular.module('com.ionic.quickstart.directivas.lazyBack', [])
  .directive('lazyBack',
  [
    '$http',
    '$timeout',
    'conexaoHttp',
    '$window',
    function ($http, $timeout, conexaoHttp, $window) {
      return {
        restrict: 'A',
        link: function (scope, element, atrrs) {

          var url;
          element[0].style = 'background-image: url(img/loading_spinner.svg)';

          var getImage = function () {
            url = atrrs.lazyBack + (atrrs.lazyBack.match(/post/) ? ("/"+ $window.innerWidth) : '');
            conexaoHttp.getCache({url: url}).then(
              function (response) {
                element.removeAttr("lazy-back");
                if(response.data.status === undefined)
                element[0].style = 'background-image: url(' + (response.data.perfil || response.data.capa || response.data.post) +')';
                else
                element[0].style = 'background-image: url(img/reload.svg)';
              },function (response) {

                $timeout(function () {
                  element[0].style = 'background-image: url(img/reload.svg)';
                }, 3000);
              }
            )
          }

          atrrs.$observe('lazyBack', function () {
            var regex_a = atrrs.lazyBack ? atrrs.lazyBack.match(/\B[\//\//]/) : undefined;
            var regex_b = atrrs.lazyBack ? atrrs.lazyBack.match(/\b[\//]+$/) : undefined;
            if(!regex_a && !regex_b) getImage();
          })
        }
      };
    }]);
  })();
