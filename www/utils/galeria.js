/**
* @ngdoc service
* @name com.ionic.quickstart.utils.galeria:galeria
* @author Fábio Pereira <fabio.pereira.gti@gmail.com>
* @description
* Servico que acessa a galeria de imagens
* @requires $cordovaCamera
* @requires Galeria
*/
(function () {
  'use strict';
  angular.module('com.ionic.quickstart.utils.galeria', [])
  .service('Galeria',
    [
      '$cordovaCamera',
      '$q',
      function (
        $cordovaCamera,
        $q
      ) {

        /**
        * @ngdoc property
        * @name com.ionic.quickstart.utils.galeria:galeria#self
        * @propertyOf com.ionic.quickstart.utils.galeria:galeria
        * @description
        * variavel proxy
        */
        var self = this;


        /**
        * @ngdoc method
        * @name com.ionic.quickstart.utils.galeria:galeria#openImages
        * @methodOf com.ionic.quickstart.utils.galeria:galeria
        * @description
        *  Método que abre a galeria nativa de imagens do dispositivo
        * @return {Object} promise - retorna uma promise contendo a uri da imagem ou uma Exception
        */
        self.openImages = function () {
          var deferred = $q.defer();
          var options = {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          };
          $cordovaCamera.getPicture(options).then(function (imageURI) {
            if (imageURI.substring(0, 21) === 'content://com.android') {
              var photo_split = imageURI.split('%3A');
              imageURI = 'content://media/external/images/media/' + photo_split[1];
            }
            deferred.resolve(imageURI);
          }, function (err) {
            deferred.reject(err);
          });
          return deferred.promise;
        };
      }]);
})();
