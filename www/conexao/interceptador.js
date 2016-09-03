/**
* @ngdoc service
* @name com.ionic.quickstart.conexao.interceptador:interceptador
* @author Fábio Pereira <fabio.pereira.gti@gmail.com>
* @description
* Serviço responsável por inteceptar todas as requisições e monitorar os cabeçaalhos das requisições
* @requires $http
* @requires $q
* @requires $CONSTANT_BASE_URL
* @requires httpOfflineCache
*/

(function () {
  'use strict';
  angular.module('com.ionic.quickstart.conexao.interceptador', [])
  .factory('interceptador', ['$q', '$log', function ($q) {
    return {
      /* Inteceptors REQUEST  */
      'request': function (config) {
        return $q.resolve(config);
      },

      /*  Inteceptors REQUEST_ERROR  */
      'requestError': function (rejection) {
        return $q.reject(rejection);
      },

      /*  Inteceptors RESPONSE */
      'response': function (response) {
        return $q.resolve(response);
      },

      /*  Inteceptors RESPONSE_ERROR  */
      'responseError': function (rejection) {
        return $q.reject(rejection);
      }
    };
  }]);
})();
