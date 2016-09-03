'use strict';
describe('Compile', function() {
  var $rootScope;
  var $compile;
  var view;
  beforeEach(module('ionic'));
  beforeEach(module('com.ionic.quickstart.directivas.compile'));
  beforeEach(inject(function ($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    view = $compile("<div compile='teste'></div>")($rootScope);
  }));

  describe('Compilação', function(){
    it('variavel', function () {
        $rootScope.teste = '<span class="teste">Compilado<span>';
        $rootScope.$digest();
        expect(view.html()).toContain('Compilado');
    })
  });
});
