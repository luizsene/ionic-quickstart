(function(){
	'use strict';
	angular.module('com.ionic.quickstart.utils.audio', [])
	.factory('Audio', ['$cordovaNativeAudio', '$bd', function($cordovaNativeAudio, $bd){
	
		// Mapa de audio pré carregados
		var _audioMap = {
			1: 'message'
		};
		
		// Pré carrega audio para a memória
		var _preload = function(){
			try{
				$cordovaNativeAudio.preloadSimple(_audioMap[1], 'audio/message.mp3')
				.then(function (msg) {
				  console.log(msg);
				}, function (error) {
				  alert(error);
				});
			}catch(err){};
		}
		
		// Chama a função de pré carregamento quando o arquivo é carregado para a primeira vez
		// Toda factory é Statefull ou seja uma única instância para toda a aplicação
		// Melhora o desempenho da aplicação e execução do audio	
		_preload();
		
		// Executa um audio especificado
		var _play = function(audioId){
			try{
				audioId = isNaN(audioId) ? audioId : 1;
				if($bd.get('configuracao').som) $cordovaNativeAudio.play(_audioMap[audioId]);
			}catch(err){};
		}
		
		// Retorna as funções acessíveis da factory em questão 
		return {
			play: function(audioId){
				return _play(audioId);
			}
		}
		
	}]);
})();