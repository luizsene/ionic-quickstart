(function () {
  'use strict';
  angular.module('quickstart', [
    'ionic',
    'com.ionic.quickstart.controller', //Controllers
    'com.ionic.quickstart.init', // inicialização
    'com.ionic.quickstart.utils', // Utilidades
    'com.ionic.quickstart.conexao', //conexão
    'com.ionic.quickstart.model', //model
    'com.ionic.quickstart.diretivas', //Diretivas,
    'com.ionic.quickstart.filtros', //Filtros

    //Módulos de terceiros
    'ui.utils.masks',
    'monospaced.elastic',
    'ngCordova',
    'com.tabNavBar.1fabiopereira', // tab nav bar
    'com.1fabiopereira.lazy' // lazy load img
  ])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
})();
