/**
* @ngdoc service
* @author Fábio Pereira <fabio.pereira.gti@gmail.com>
* @name com.ionic.quickstart.utils.popups:popups
* @description
* Serviço responsável pelo gerenciamento de popups dentro da aplicação, (criação e destruição)
* @requires $ionicPopup
* */
(function () {
  'use strict';
  angular.module('com.ionic.quickstart.utils.popups', [])
  .service('Popups', ['$ionicPopup', function ($ionicPopup) {

    /**
    * @ngdoc property
    * @name com.ionic.quickstart.utils.popups:popups#self
    * @propertyOf com.ionic.quickstart.utils.popups:popups
    * @description
    * Variável proxy, faz referência a instância do própio serviço
    *
    */
    var self = this;


    /**
    * @ngdoc method
    * @name com.ionic.quickstart.utils.popups:popups#Criar
    * @methodOf com.ionic.quickstart.utils.popups:popups
    * @param {Object}  $scope - $scope ao qual o popup deve pertencer
    * @param {String}  template - caminho relativo do template a ser carregado
    * @param {String} titulo - (Opcional) titulo do popup
    * @param {String} subTitle - (Opcional) subtitulo do popup
    * @description
    *  Método que cria um popup sobre a tela
    * @return {Object} popup - Popup criado de acordo com as informações
    */
    self.criar = function ($scope, template, title, subTitle) {
      title  = title ? title : '';
      subTitle  = subTitle ? subTitle : '';
      return $ionicPopup.show(
        {
          title: title,
          subTitle: subTitle,
          templateUrl: template,
          scope: $scope,
          animation: 'slide-in-up'
        });
    };
  }]);
})();
