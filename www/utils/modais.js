/**
* @ngdoc service
* @name com.ionic.quickstart.utils.modais:modais
* @author Fábio Pereira <fabio.pereira.gti@gmail.com>
* @description
* Serviço responsável pelo gerenciamento de Modais dentro da aplicação criação e destruição
* @requires $ionicModal
* @requires $q
* */
(function () {
  'use strict';
  angular.module('com.ionic.quickstart.utils.modais', [])
  .service('Modal', ['$ionicModal', '$q', function ($ionicModal, $q) {

    /**
    * @ngdoc property
    * @name com.ionic.quickstart.utils.modais:modais#self
    * @propertyOf com.ionic.quickstart.utils.modais:modais
    * @description
    * Variável proxy, faz referência a instância do própio serviço
    *
    */
    var self = this;


    /**
    * @ngdoc method
    * @name com.ionic.quickstart.utils.modais:modais#criar
    * @methodOf com.ionic.quickstart.utils.modais:modais
    * @param {Object}  $scope - $scope ao qual o modal deve pertencer
    * @param {String}  template - caminho relativo do template a ser carregado
    * @description
    *  - Método cria um modal sobre a tela
    */
    self.criar = function ($scope, template) {
      var deferred = $q.defer();

      if(!template){
        deferred.reject(new Error('Template cannot be null'));
      }else{
        $ionicModal.fromTemplateUrl(template, {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function (modal) {
          deferred.resolve(modal);
        }, function(err){
          deferred.reject(err);
        });
      }

      return deferred.promise;
    };

    /**
    * @ngdoc method
    * @name com.ionic.quickstart.utils.modais:modais#destruir
    * @methodOf com.ionic.quickstart.utils.modais:modais
    * @param {Object}  modal - instância de um modal
    * @return {Object} modal - Objeto indefinido (Undefined)
    * @description
    *  Método que destrói a instancia de um modal especificado
    */
    self.destruir = function (modal) {
      try {
        modal.hide();
        modal.remove();
      } catch (err) {}

      return null;
    };
  }]);
})();
