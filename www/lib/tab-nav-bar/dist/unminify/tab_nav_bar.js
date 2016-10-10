/**
* @ngdoc overview
*
* @name com.tabNavBar.1fabiopereira
*
* @author Fábio Pereira <fabio.pereira.gti@gmail.com>
*
* @version 0.0.1
*
* @description
* This module aims to facilitate the creation of navigation tabs using the IONIC FRAMEWORK
*
* @todo - The next version will feature the pluguin Support Animated transitions
*
* @license
*  Copyright (c) 2016 Fábio Pereira
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the "Software"),
*  to deal in the Software without restriction, including without limitation the rights to use,
*  copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
*  persons to whom the Software is furnished to do so, subject to the following conditions:
*
*
*  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*
*
*  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
*  TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
*  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
*  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*
*
*/
(function () {
  "use strict";
  angular.module('com.tabNavBar.1fabiopereira', ['ionic'])

  .directive("tabNavBar", ['$rootScope', '$ionicScrollDelegate', '$timeout', '$sce',
  function ($rootScope, $ionicScrollDelegate, $timeout, $sce) {


    /**
    * @ngdoc property
    * @module com.tabNavBar.1fabiopereira
    * @name com.tabNavBar.1fabiopereira:tabNavBar#childElem
    * @propertyOf com.tabNavBar.1fabiopereira:tabNavBar
    * @description
    * Children elements of the guide block
    */
    var childElem = new Array();

    /**
    * @ngdoc property
    * @module com.tabNavBar.1fabiopereira
    * @name com.tabNavBar.1fabiopereira:tabNavBar#scopeId
    * @propertyOf com.tabNavBar.1fabiopereira:tabNavBar
    * @description
    * Save scope id of page
    */
    var scopeId;

    /**
    * @ngdoc property
    * @module com.tabNavBar.1fabiopereira
    * @name com.tabNavBar.1fabiopereira:tabNavBar#blocksScrollPosition
    * @propertyOf com.tabNavBar.1fabiopereira:tabNavBar
    * @description
    * Array with the scroll position of each tab
    */
    var blocksScrollPosition = Array(0,0,0);

    /**
    * @ngdoc property
    * @module com.tabNavBar.1fabiopereira
    * @name com.tabNavBar.1fabiopereira:tabNavBar#blocks
    * @propertyOf com.tabNavBar.1fabiopereira:tabNavBar
    * @description
    * content blocks
    */
    var blocks = new Array();


    /**
    * @ngdoc property
    * @module com.tabNavBar.1fabiopereira
    * @name com.tabNavBar.1fabiopereira:tabNavBar#tabs
    * @propertyOf com.tabNavBar.1fabiopereira:tabNavBar
    * @description
    * array containing one tab at each position
    */
    var tabs;


    /**
    * @ngdoc property
    * @module com.tabNavBar.1fabiopereira
    * @name com.tabNavBar.1fabiopereira:tabNavBar#tabs
    * @propertyOf com.tabNavBar.1fabiopereira:tabNavBar
    * @description
    * array that stores which the active tab
    */
    var ativos;

    /**
    * @ngdoc method
    * @module com.tabNavBar.1fabiopereira
    * @name com.tabNavBar.1fabiopereira:tabNavBar#link
    * @methodOf com.tabNavBar.1fabiopereira:tabNavBar
    * @description
    * function that maintains a link between the element and the directive
    */
    var link = function (scope, elem, attrs) {

      /* clean property for new instance */
      if(scopeId !== scope.$id){
        childElem = new Array()
      }

      Object.prototype.toString.call(scope.tabs) == '[object Array]'
      ? tabs = scope.tabs
      : (function () { throw new TypeError ("Field tabs expected Array");})();


      typeof parseInt(scope.tabActivated) == 'number'
      ? scope.tabActivated = parseInt(scope.tabActivated)
      : (function () { throw new TypeError ("Field tab-activated expected Number");})();


      /**
      * @ngdoc method
      * @module com.tabNavBar.1fabiopereira
      * @name com.tabNavBar.1fabiopereira:tabNavBar#generateTemplate
      * @methodOf com.tabNavBar.1fabiopereira:tabNavBar
      * @description
      * function that configures which the active tab according to the configuration
      */
      function generateActivatedArray(nun) {
        var array = new Array();
        scope.tabActivated = parseInt(scope.tabActivated);

        scope.tabActivated  = scope.tabActivated && scope.tabActivated < nun ? scope.tabActivated : 0;
        for (var i = 0; i < nun; i++) {
          (i == scope.tabActivated) ? array.push(1) : array.push(0);
        }
        return array;
      }

      ativos = generateActivatedArray(tabs.length);
      scope.active = ativos;

      /**
      * @ngdoc method
      * @module com.tabNavBar.1fabiopereira
      * @name com.tabNavBar.1fabiopereira:tabNavBar#generateTemplate
      * @methodOf com.tabNavBar.1fabiopereira:tabNavBar
      * @description
      * function that generates the html according to the configuration
      */
      (function generateTemplate() {
        var template = '';
        for (var i = 0; i < tabs.length; i++){
          template += '<a class="button" id="tab'+ (i + 1) +'"><span ng-class="{'+ "'ativo'" +': active['+ i +']}">'+ tabs[i] +'</span></a>';
        }
        scope.generateTemplate = template;
      })();


      /**
      * @ngdoc event
      * @module com.tabNavBar.1fabiopereira
      * @name com.tabNavBar.1fabiopereira:tabNavBar#new_blocks
      * @eventOf com.tabNavBar.1fabiopereira:tabNavBar
      * @description
      * function that identifies which blocks are on the screen
      */
      $rootScope.$on('new_blocks', function (e, b) {
        blocks = b;
        var temp = blocks.length;
        for (var i = 0; i < temp; i++) {
          if(!ativos[i])
          blocks[i].addClass('ng-hide');
        }
      });


      /**
      * @ngdoc event
      * @module com.tabNavBar.1fabiopereira
      * @name com.tabNavBar.1fabiopereira:tabNavBar#swipe_left
      * @eventOf com.tabNavBar.1fabiopereira:tabNavBar
      * @description
      * simulates a click to the left of the active element
      */
      $rootScope.$on('swipe_left', function (e, tab) {
        var new_tab = parseInt(tab) - 1;
        $timeout(function () {
          if(new_tab > -1)
          angular.element(childElem[new_tab]).triggerHandler('click');
        }, 50);
      });


      /**
      * @ngdoc event
      * @module com.tabNavBar.1fabiopereira
      * @name com.tabNavBar.1fabiopereira:tabNavBar#swipe_right
      * @eventOf com.tabNavBar.1fabiopereira:tabNavBar
      * @description
      * simulates a click to the right of the active element
      */
      $rootScope.$on('swipe_right', function (e, tab) {
        var new_tab = parseInt(tab) + 1;
        $timeout(function () {
          if(tabs.length > new_tab)
          angular.element(childElem[new_tab]).triggerHandler('click');
        }, 50);
      });


      $rootScope.$on('scroll_block', function (e, scroll) {
        blocksScrollPosition[scroll.position] = scroll.scroll;
      });


      /* anonymous function that creates the according to configuration css */
      (function () {
        var style = document.createElement('style');
        style.type = "text/css";
        style.innerHTML =

        "span.ativo {"+
        "border-bottom: 3px solid" + scope.tabActivatedColor + ";" +
        "padding-bottom: 4px;" +
        "}" +

        "#tab-nav, #tab-nav .button-bar, #tab-nav .button-bar a {"+
        "background:" + scope.backgroundColor + ";" +
        "color:" + scope.textColor + ";" +
        "}" +

        "*[id^='tab-nav-block-id-'] {"+
        "background: " + scope.backgroundBlockColor  + ";" +
        "height: 100%;" +
        "}" +

        "a[id^='tab']{border: none !important;}" +

        document.getElementsByTagName('head')[0].appendChild(style);
      })();

      $timeout(function () {
        childElem = angular.element(document.querySelector(".child")).prop('children');
        if(childElem.length){
          for (var i = 0; i < childElem.length; i++) {
            angular.element(childElem[i]).on('click', function (e) {
              var tab = angular.element(e.path ? e.path[0] : e.target).prop('id').replace(/tab/g, "");
              for (var i = 0; i < tabs.length; i++) {
                if(i == tab - 1) {
                  ativos[i] = true;
                } else {
                  ativos[i] = false;
                  angular.element(document.querySelector("#tab-nav-block-id-".concat(i+1))).addClass('ng-hide');
                }
              }
              angular.element(document.querySelector("#tab-nav-block-id-".concat(tab))).removeClass('ng-hide');
              $ionicScrollDelegate.scrollTo(0, blocksScrollPosition[tab - 1], true);
              scope.active = ativos;
              scope.$apply();
            })
          }
        }
      }, 200)
    }

    return{
      strict: "AE",
      link: link,
      template: "<div class='bar bar-subheader' id='tab-nav' tab-nav><div class='button-bar child' compile='generateTemplate'></div></div>",
      replace: false,
      scope: {
        tabs: "=tabs",
        tabActivated: "@tabActivated",
        tabActivatedColor: "@tabActivatedColor",
        backgroundColor: "@backgroundColor",
        backgroundBlockColor: "@backgroundBlockColor",
        textColor: "@textColor"
      },
      tranclude: false,
    }
  }])


  /**
  * @ngdoc directive
  * @module com.tabNavBar.1fabiopereira
  * @name com.tabNavBar.1fabiopereira:tabNavBlock
  * @strict AE
  * @requires $rootScope
  * @description
  * Provider that provides some functions for configuration directive
  */
  .directive("tabNavBlock", ['$rootScope', '$ionicGesture', '$ionicScrollDelegate', function ($rootScope, $ionicGesture, $ionicScrollDelegate) {

    /**
    * @ngdoc property
    * @module com.tabNavBar.1fabiopereira
    * @name com.tabNavBar.1fabiopereira:tabNavBlock#blocks
    * @propertyOf com.tabNavBar.1fabiopereira:tabNavBlock
    * @description
    * content blocks
    */
    var blocks = new Array();

    /**
    * @ngdoc method
    * @module com.tabNavBar.1fabiopereira
    * @name com.tabNavBar.1fabiopereira:tabNavBlock#link
    * @methodOf com.tabNavBar.1fabiopereira:tabNavBlock
    * @description
    * function that maintains a link between the element and the directive
    */
    var link = function (scope, elem, attrs) {

      /* add id on blocks */
      elem[0].id = "tab-nav-block-id-".concat(scope.id_block);
      blocks.push(elem);

      if(blocks.length == (scope.max || 3)){
        $rootScope.$emit('new_blocks', blocks);
        blocks = new Array();
      }

      /* find elements */
      function fn(e) {
        var el;
        for (var i = 0; i < e.path.length; i++) {
          if(angular.element(e.path[i]).prop('id') && angular.element(e.path[i]).prop('id').match(/tab-nav-block-id-/g)){
            el = angular.element(e.path[i]).prop('id').replace(/tab-nav-block-id-/g, "");
            i = e.path.length;
          }
        }
        return el;
      }

      /* event swipe right on block */
      $ionicGesture.on('swiperight', function (e) {
        var el = fn(e);
        if(el)
        $rootScope.$emit('swipe_left', parseInt(el) - 1);
      }, elem);

      /* event swipe left on block */
      $ionicGesture.on('swipeleft', function (e) {
        var el = fn(e);
        if(el)
        $rootScope.$emit('swipe_right', parseInt(el) - 1);
      }, elem);


      /* event  scroll down on block */
      $ionicGesture.on('dragdown', function (e) {
        var el = fn(e);
        if(el)
          $rootScope.$emit('scroll_block', {position: parseInt(el) - 1, scroll: $ionicScrollDelegate.getScrollPosition().top});
      }, elem);

      /* event scroll up on block */
      $ionicGesture.on('dragup', function (e) {
        var el = fn(e);
        if(el)
          $rootScope.$emit('scroll_block', {position: parseInt(el) - 1, scroll: $ionicScrollDelegate.getScrollPosition().top});
      }, elem);

    };

    return{
      strict: "AE",
      link: link,
      scope: {id_block: '@tabNavBlock', max:'@limit'}
    }
  }])
})();
