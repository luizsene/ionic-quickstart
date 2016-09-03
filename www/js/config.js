(function () {
  'use strict';
  angular.module('com.ionic.quickstart.config', [])

  .config(['$ionicConfigProvider', function($ionicConfigProvider) {
     $ionicConfigProvider.views.maxCache(0);
     $ionicConfigProvider.navBar.alignTitle('center');
     $ionicConfigProvider.views.transition('platform');
     $ionicConfigProvider.tabs.position('bottom');
  }])

  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put= {};
    $httpProvider.defaults.headers.patch = {};
    $httpProvider.interceptors.push('interceptador');
  }])


})();
