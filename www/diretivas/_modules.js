/**
* @ngdoc overview
* @name com.ionic.quickstart.directivas
* @author Fábio Pereira <fabio.pereira.gti@gmail.com>
* @version 1.0.1
* @description
* Os serviço presentes em **`com.ionic.quickstart.directivas`**  consistem em diretivas uteis e comuns em varias aplicações:
* - locallização
* - lazyLoad
* - enter
*/
'use strict';
(function () {
  angular.module('com.ionic.quickstart.diretivas', [
    'com.ionic.quickstart.diretivas.Localizacao',
    'com.ionic.quickstart.directivas.lazy',
    'com.ionic.quickstart.directivas.lazyBack',
    'com.ionic.quickstart.directivas.enter',
    'com.ionic.quickstart.directivas.compile',
    'com.ionic.quickstart.directivas.next'
  ])
})()
