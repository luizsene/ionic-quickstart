/**
* @ngdoc overview
* @name com.ionic.quickstart.model
* @author Fábio Pereira <fabio.pereira.gti@gmail.com>
* @version 0.0.1
* @description
* Os serviço presentes em **`com.ionic.quickstart.model`** consistem uma abstração da
  conexão entre aplicação e a controller responsável pelo objeto do lado servidor
* - usuario
*/

(function () {
  'use strict';
  angular.module('com.ionic.quickstart.model',
    [
      'com.ionic.quickstart.model.usuario',
    ]);
})();
