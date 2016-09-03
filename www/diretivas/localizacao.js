/**
* @ngdoc directive
* @author Fábio Pereira <fabio.pereira.gti@gmail.com>
* @name com.ionic.quickstart.directivas.enter
* @restrict A
* @element textarea
* @element input
* @description
* Dispara uma função especificada quando a tecla enter é pressionada pelo usuário
*/
(function () {
  'use strict';
  angular.module('com.ionic.quickstart.diretivas.Localizacao', [])

  .directive('ionGooglePlace',
  [
    '$ionicTemplateLoader',
    '$ionicPlatform',
    '$q',
    '$timeout',
    '$rootScope',
    '$document',
    function(
      $ionicTemplateLoader,
      $ionicPlatform,
      $q,
      $timeout,
      $rootScope,
      $document
    ) {

      var link = function(scope, element, attrs, ngModel) {
        scope.dropDownActive = false;
        var service = new google.maps.places.AutocompleteService();
        var searchEventTimeout = undefined;
        var latLng = null;

        var searchInputElement = angular.element(element.find('input'));

        scope.selectLocation = function(location) {
          scope.dropDownActive = false;
          scope.searchQuery = location.description;
          if (scope.locationChanged) {
            console.log(location);
            scope.locationChanged({location: location});
          }
        };
        if (!scope.radius) {
          scope.radius = 1500000;
        }

        scope.locations = []

        scope.$watch('searchQuery', function(query) {
          if (!query) {
            query = '';
          }
          scope.dropDownActive = (query.length >= 2 && scope.locations.length);
          if (searchEventTimeout) $timeout.cancel(searchEventTimeout);
          searchEventTimeout = $timeout(function() {
            if(!query) return;
            if (query.length < 2) {
              scope.locations = [];
              return;
            };

            var req = {};
            req.input = query;
            if (latLng) {
              req.location = latLng;
              req.radius = scope.radius;
            }
            service.getQueryPredictions(req, function (predictions, status) {
              if (status == google.maps.places.PlacesServiceStatus.OK) {
                scope.locations = predictions;
                //hide loading
                scope.$apply();
              }
            });
          }, 350); // we're throttling the input by 350ms to be nice to google's API
        });

        var onClick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          scope.dropDownActive = true;
          scope.$digest();
          searchInputElement[0].focus();
          setTimeout(function(){
            searchInputElement[0].focus();
          },0);
        };

        var onCancel = function(e){
          setTimeout(function () {
            scope.dropDownActive = false;
            scope.$digest();
          }, 200);
        };

        element.find('input').bind('click', onClick);
        element.find('input').bind('blur', onCancel);
        element.find('input').bind('touchend', onClick);


        if(attrs.placeholder){
          element.find('input').attr('placeholder', attrs.placeholder);
        }
      };

      return {
        require: '?ngModel',
        restrict: 'A',
        templateUrl: 'view/ionGooglePlaceTemplate.html',
        replace: true,
        scope: {
          searchQuery: '=ngModel',
          locationChanged: '&',
          radius: '='
        },
        link: link
      }
    }
  ])



  .service('$Geo', ['$log', '$q', function ($log, $q) {


    var self = this;



    self.getCoord = function (location) {
      var q = $q.defer();
      var geocoder = new google.maps.Geocoder();

      geocoder.geocode({
        address: location
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          q.resolve(results);
        } else {
          q.reject();
        }
      });
      return q.promise;
    }
  }])

  .run(["$templateCache", function($templateCache) {
    $templateCache.put("view/ionGooglePlaceTemplate.html",template);
  }]);

  // autocomplete
  var template = '<div class="item ion-place-tools-autocomplete">' +
  '<fieldset class="material">'+
  '<input type="text" id="endereco" name="endereco" required  autocomplete="off" ng-model="searchQuery">' +
  '<hr>' +
  '<label for="localizacao"><i class="ion ion-location">&nbsp;&nbsp;</i>Localidade</label>' +
  '</fieldset>' +
  '<div class="ion-place-tools-autocomplete-dropdown" style="padding: 12px;" ng-if="dropDownActive">' + //ng-if="dropDownActive"
  '<ion-list>' +
  '<ion-item style="padding: 9px; background-color: #E6E6E6;" ng-repeat="location in locations" ng-click="selectLocation(location)">' +
  '<i class="ion-ios-location" style="padding-right: 5px; color: #5437b7"></i>' +
  '<p style="font-size: 14px; display: inline;">{{location.description}}</p>' +
  '</ion-item>' +
  '</ion-list>' +
  '</div>' +
  '</div>';

})();
