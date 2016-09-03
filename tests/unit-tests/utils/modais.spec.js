'use strict';
describe('Módulo Utils', function() {
  var Modais;
  var scope;
  var modalInstance;
  var deferred;
  var $httpBackend;
  var $ionicModal

  beforeEach(module('ionic'));

  beforeEach(module('com.ionic.quickstart.utils.modais'));

  beforeEach(inject(function($injector){
    scope = $injector.get('$rootScope').$new();
    Modais = $injector.get('Modal');
    deferred = $injector.get('$q').defer();
  }));

  describe('Criar', function() {

    it("Template não pode ser null", function(){
      var promise = Modais.criar(scope, undefined);
      var resolvedValue;
      var rejectValue;

      promise.then(function (value) {
        resolvedValue = value;
      }, function (err) {
        rejectValue = err;
      });

      scope.$apply();

      expect(resolvedValue).toBeUndefined();
      expect(rejectValue.message).toBe('Template cannot be null');
    })

    it('Destruir', function () {
      var res = Modais.destruir({});
      expect(res).toBe(null);
    })
  });
});
