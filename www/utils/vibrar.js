(function(){
	'use strict';
	angular.module('com.ionic.quickstart.utils.vibrar', [])
	.factory('Vibrar', ['$cordovaVibration', '$bd', function($cordovaVibration, $bd){
		
		// Executa o vibrar no dispositivo
		// Caso não seja informado tempo será utilizado 100 milisegundos
		var _vibrate = function(time){
			try{
				time = (!isNaN(time) && time > 100) ? time : 100;
			  if($bd.get('configuracao').vibrar) $cordovaVibration.vibrate(time);
			}catch(err){}
		};
		
		// Retorna as funções acessíveis da factory
		return{
			vibrate: function(time){
				return _vibrate(time);
			}
		}
	}]);
})();