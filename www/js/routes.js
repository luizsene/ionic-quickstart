(function () {
  'use strict';
  angular.module('com.ionic.quickstart.routes', [])
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    /* ------------------------ Configura a rota simples da aplicação ------------------------ */
    .state('load', {
      url: '/load',
      templateUrl: 'view/load.html',
      controller: 'Load'
    })

    .state('entrar', {
      url: '/entrar',
      templateUrl: 'view/entrar-criar.html',
      controller: 'Login'
    })



    /* ------------------------ Configura rotas Abstrata e hierarquicas para a aplicação ------------------------ */
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'view/tabs.html',
      controller: 'Tabs'
    })

    .state('tab.home', {
      url: '/home',
      views: {
        'tab-home':{
          templateUrl: 'view/load.html',
          controller: 'Home'
        }
      }
    })

    /* ------------------------ Caso nenhuma url seja encontrada por padrão usar ------------------------ */
    $urlRouterProvider.otherwise('/entrar');

  });

})();
