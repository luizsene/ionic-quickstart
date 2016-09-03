/**
* @ngdoc service
* @name com.ionic.quickstart.conexao.auth:auth
* @author Fábio Pereira <fabio.pereira.gti@gmail.com>
* @description
* Serviço responsável por verificar a autenticação do usuario do aplicativo
* @requires $q
* @requires $bd
*/
(function () {
  'use strict';
  angular.module('com.ionic.quickstart.conexao.auth', [])
  .service('Auth',
    [
      '$q',
      '$bd',
      function (
        $q,
        $bd
      ) {

        /**
        * @ngdoc property
        * @name com.ionic.quickstart.conexao.auth:auth#self
        * @propertyOf com.ionic.quickstart.conexao.auth:auth
        * @description
        * variavel proxy
        */
        var self = this;


        /**
        * @ngdoc method
        * @name ccom.ionic.quickstart.auth:auth#get
        * @methodOf com.ionic.quickstart.conexao.auth:auth
        * @description
        * Verifica se existe as credenciais do usuário no banco de dados localstorage
        * @return {Object} usuario - Objeto com as informações do usuário logado
        */
        self.isAuth = function () {
          var deferred = $q.defer();
          var credenciais = $bd.get('usuario_credenciais');
          if(credenciais){
            deferred.resolve(credenciais);
          }else{
            deferred.reject(null);
          }
          return deferred.promise;
        };
      }
    ]);
})();
