'use strict';
describe('Compile', function() {
  var scope;
  var element;
  var compile;

  beforeEach(module('ionic'));

  beforeEach(module('com.ionic.quickstart.directivas.enter'));

  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
     scope.escapeCallback = jasmine.createSpy('escapeCallback');
     compile = $injector.get('$compile');
  }));


describe('', function(){

  beforeEach(function() {
    var elem = angular.element('<input enter="escapeCallback()">');
    element = compile(elem)(scope);
  });

  it('Função não chamada', function () {
    scope.$digest();
    element.triggerHandler({type:'keydown', which:27});
    expect(scope.escapeCallback).not.toHaveBeenCalled();
  });

  it('Chamada da função', function() {
    element.triggerHandler({type:'keydown', which:13});
    scope.$digest();
    expect(scope.escapeCallback).toHaveBeenCalled();
   });


  });
});
