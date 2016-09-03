/**
* @ngdoc overview
* @name com.ionic.quickstart.init
* @author Fábio Pereira <fabio.pereira.gti@gmail.com>
* @version 1.7.11
* @description
* Os serviço presentes em **`com.ionic.quickstart.init`** consistem no modulo de inicialização da aplicação, onde as configurações e rotas são carregadas
* - routes
* _ config
*/
(function () {
  'use strict';
  angular.module('com.ionic.quickstart.init', [
    'com.ionic.quickstart.routes',
    'com.ionic.quickstart.config',
  ])
})();
