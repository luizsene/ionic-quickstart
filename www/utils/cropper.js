/**
 * @ngdoc service
 * @name com.ionic.quickstart.utils.cropper:cropper
 * @author Fábio Pereira <fabio.pereira.gti@gmail.com>
 * @description
 * Servico que representa e manipula o Objeto cropper na apliação
 */
(function () {
  'use strict';
  angular.module('com.ionic.quickstart.utils.cropper', [])
  .service('Cropper', ['$window','$q', '$rootScope', function ($window, $q, $rootScope) {

    var self = this;
    var ratio;
    $rootScope.$on("ratio", function (data) {
      ratio = data;
    });
    var size = $window.innerWidth - 20;
    var style = document.createElement('style');
    style.type = "text/css";
    style.innerHTML = ".cropper-caixa{text-align: center; height:"+ size +"px; width: "+ size +"px; position: relative; margin: auto;}";
    document.getElementsByTagName('head')[0].appendChild(style);

    self.criar = function (image) {
      var h = 0;
      var w = 0;
      var ratio = 0;
      var cropper = new Cropper(image, {
        aspectRatio: 1/1,
        dragMode: 'move',
        autoCropArea: 1,
        restore: false,
        guides: false,
        highlight: true,
        cropBoxMovable: false,
        cropBoxResizable: false,
        viewMode: 3,
        rotatable: false,
        crop: function (data) {
          h = data.height;
          w = data.width;
        },
        zoom: function (data) {
          $rootScope.$broadcast("ratio", data.ratio);
          console.warn('data inicial: ', data);
          // Zoom in
          if (data.ratio > data.oldRatio && h <= 400) {
            return false; // Prevent zoom in
          }

          // Zoom out
          if (data.ratio < data.oldRatio) {
            // return false; // Prevent zoom in
          }
        }
      })
      cropper.ratio = ratio;
      return cropper;
    };

    self.cortar = function (cropper) {
      var deferred = $q.defer();
      try {
        var sourceCanvas = cropper.getCroppedCanvas({width: 650, height: 650});
        var canvas = document.createElement('canvas');
        canvas.height = 650;
        canvas.width = 650;
        var img = document.createElement('img');
        img.src = sourceCanvas.toDataURL();
        var context = canvas.getContext("2d");
        context.drawImage(img, 0, 0);
        deferred.resolve(img.src);
      } catch (e) {
        deferred.reject(e);
      }
      return deferred.promise;
    }
  }])

})();
