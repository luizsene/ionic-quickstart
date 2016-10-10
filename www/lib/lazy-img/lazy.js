(function () {
  'use strict';
  angular.module('com.1fabiopereira.lazy', [])

  .provider('lazyImgConfig', function () {

    this.setLoadGif = function (gif) {
      this.loadGif = gif;
      this.setDefaulHeight();
    };

    this.setErrorGif = function (gif) {
      this.errorGif = gif;
    }

    this.setDefaulHeight = function (height) {
      this.height = height ? (height + 'px') : '90vw';
    }

    this.$get = function () {
      return this;
    };
  })

  .directive('lazyImg', ['lazyImgConfig', function (lazyImgConfig) {

    var IMG_FLAG = "IMG";

    // generate background image
    var generateBackground = function (element, url) {
      element.css({
        'background-image': 'url(' + url + ')',
        'height': lazyImgConfig.height,
        'background-repeat': 'no-repeat',
        'background-size': '100%'
      });
    }

    // generate image src
    var generateSrc = function (element, url) {
      element.prop('src', url);
    }

    function _link(scope, element, attrs) {

      // set load
      if(IMG_FLAG === element.prop('tagName'))
        generateSrc(element, lazyImgConfig.loadGif);
      else
        generateBackground(element, lazyImgConfig.loadGif);

      var image = new Image();
      image.src = attrs.lazyImg;

      //override load image function


      // show loaded image
      image.onload = function (event) {
        if(IMG_FLAG === element.prop('tagName'))
        generateSrc(element, attrs.lazyImg);
        else
        generateBackground(element, attrs.lazyImg);
      };

      // show error gif
      image.onerror = function (event) {
        if(IMG_FLAG === element.prop('tagName'))
        generateSrc(element, lazyImgConfig.errorGif);
        else
        element.css(generateBackground(lazyImgConfig.errorGif));
      }
    };

    return {
      restrict: 'A',
      link: _link
    }
  }])
})();
