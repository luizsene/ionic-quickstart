/**
* @ngdoc controller
* @name com.ionic.quickstart.controller.tabs:tabs
* @author Fábio Pereira <fabio.pereira.gti@gmail.com>
* @description
* Controller responsável por gerenciar barra de navegção inferior da aplicação
* @requires $scope
* @requires $state
*/
(function () {
  'use strict';
  angular.module('com.ionic.quickstart.controller.tabs', [])
  .controller('Tabs',
  [
    '$scope',
    '$state',
    function (
      $scope,
      $state
    ) {

    /**
    * @ngdoc method
    * @name com.ionic.quickstart.controller.tabs:tabs#goToFeed
    * @methodOf com.ionic.quickstart.controller.tabs:tabs
    * @description
    * Função que carrega a página de feeds
    */
    $scope.goToFeed = function () {
      $state.go('tab.feed');
    }

    /**
    * @ngdoc method
    * @name com.ionic.quickstart.controller.tabs:tabs#goToNotificacoes
    * @methodOf com.ionic.quickstart.controller.tabs:tabs
    * @description
    * Função que carrega a página de notificações
    */
    $scope.goToNotificacoes = function () {
      $state.go('tab.notificacoes');
    }

    /**
    * @ngdoc method
    * @name com.ionic.quickstart.controller.tabs:tabs#goToBusca
    * @methodOf com.ionic.quickstart.controller.tabs:tabs
    * @description
    * Função que carrega a página de busca
    */
    $scope.goToBusca = function () {
      console.log('aqui');
      $state.go('tab.busca');
    }

    /**
    * @ngdoc method
    * @name com.ionic.quickstart.controller.tabs:tabs#goToPerfil
    * @methodOf com.ionic.quickstart.controller.tabs:tabs
    * @description
    * Função que carrega a página de perfil
    */
    $scope.goToPerfil = function () {
      $state.go('tab.sobre');
    }

  }]);
})();
