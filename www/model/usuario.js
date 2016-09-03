/**
* @ngdoc service
* @name com.ionic.quickstart.model.usuario:usuario
* @author Fábio Pereira <fabio.pereira.gti@gmail.com>
* @description
* Serviço com papel de representala model do objeto usuário
* @requires $q
* @requires Auth
* @requires conexaoHttp
* @requires $bd
*/
(function () {
  'use strict';
  angular.module('com.ionic.quickstart.model.usuario', [])
  .service('UsuarioModel',
    [
      '$q',
      function (
        $q,
        $bd,
        Auth
    ) {

        /**
        * @ngdoc property
        * @name com.ionic.quickstart.model.usuario:usuario#self
        * @propertyOf com.ionic.quickstart.model.usuario:usuario
        * @description
        * Variável proxy, faz referência a instância do própio serviço
        *
        */
        var self = this;

      }]);
})();
