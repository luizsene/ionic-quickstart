/**
* @ngdoc overview
* @name com.ionic.quickstart.utils
* @author Fábio Pereira <fabio.pereira.gti@gmail.com>
* @version 2.3.1
* @description
* Os serviço presentes em **`com.ionic.quickstart.utils`** consistem em um compilado de funções úteis para
  diferentes tipos de projetos, esse módulo apresenta funções como:
* - localstorage
* - constantes
* - modais
* - popups
* - galeria
* - cropper
* - cache
* - audio
* - vibrar
*/

(function () {
  'use strict';
  angular.module('com.ionic.quickstart.utils', [
    'com.ionic.quickstart.utils.localstorage',
    'com.ionic.quickstart.utils.constantes',
    'com.ionic.quickstart.utils.modais',
    'com.ionic.quickstart.utils.popups',
    'com.ionic.quickstart.utils.galeria',
    'com.ionic.quickstart.utils.cropper',
    'com.ionic.quickstart.ionic-http-offline-cache',
    'com.ionic.quickstart.utils.audio',
    'com.ionic.quickstart.utils.vibrar'
  ]);
})();
