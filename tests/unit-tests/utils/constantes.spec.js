'use strict';
describe('Constantes', function() {

var CONSTANT_BASE_URL;

  beforeEach(module('ionic'));
  beforeEach(module('com.ionic.quickstart.utils.constantes'));
  beforeEach(inject(function($injector){
    CONSTANT_BASE_URL = $injector.get('CONSTANT_BASE_URL');
  }));

  describe('CONSTANT_BASE_URL', function() {
    it("É definido", function () {
      expect(CONSTANT_BASE_URL).toBeDefined();
    })
  });
});
