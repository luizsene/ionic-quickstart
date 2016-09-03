/**
* @ngdoc overview
* @name com.ionic.quickstart.controller
* @author Fábio Pereira <fabio.pereira.gti@gmail.com>
* @version 1.0.0
* @description
* Os serviço presentes em **`com.ionic.quickstart.controller`**  consistem nas controller que gerenciam a aplicação:
* - login
* - tabs
*/
(function () {
  'use strict';
  angular.module('com.ionic.quickstart.controller', [
    'com.ionic.quickstart.controller.login',
    'com.ionic.quickstart.controller.tabs',
  ])
})();
