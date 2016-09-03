/**
* @ngdoc overview
* @name com.ionic.quickstart.conexao
* @author Fábio Pereira <fabio.pereira.gti@gmail.com>
* @version 1.11.0
* @description
* Os serviço presentes em **`com.ionic.quickstart.conexao`**  são responsáveis pela
  logica de requisições ao servidor:
* - connect
* - auth
* - interceptador
*/
(function () {
  'use strict';
  angular.module('com.ionic.quickstart.conexao',
    [
      'com.ionic.quickstart.conexao.conexao',
      'com.ionic.quickstart.conexao.auth',
      'com.ionic.quickstart.conexao.interceptador'
    ]);
})();
