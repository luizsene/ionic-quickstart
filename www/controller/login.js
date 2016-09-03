/**
* @ngdoc controller
* @name com.ionic.quickstart.controller.login:login
* @author Fábio Pereira <fabio.pereira.gti@gmail.com>
* @description
* Controller responsável por gerenciar as views de login, cadastro e a tela inicial da aplicação
* @requires $scope
* @requires $state
* @requires UsuarioModel
* @requires $q
* @requires $rootScope
* @requires $ionicPush
* @requires $ionicUser
* @requires $ionicPlatform
* @requires Auth
*/
(function () {
  'use strict';
  angular.module('com.ionic.quickstart.controller.login', [])
  .controller('Login',
  [
    '$scope',
    '$state',
    '$q',
    '$ionicPlatform',
    'Auth',
    '$filter',
    function (
      $scope,
      $state,
      $q,
      $ionicPlatform,
      Auth,
      $filter
    ) {

    }])
  })();
