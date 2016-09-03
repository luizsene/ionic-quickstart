'use strict';

describe('Utils', function() {
  var Popup;
  var scope;

  beforeEach(module('ionic'));
  beforeEach(module('com.ionic.quickstart.utils.popups'));
  beforeEach(inject(function($injector){
    Popup = $injector.get('Popups');
    scope = $injector.get('$rootScope').$new();
  }));

  describe('Popups', function(){

    var popup;

    it("é definido", function(){
      expect(Popup).toBeDefined();
    });

    it("Criar All", function(){
      Popup.criar(scope,null,'Olá','Teste').then(function (popup) {
        expect(popup).toBeDefined();
      }, function (err) {
        expect(err).toBeDefined();
      });
    });

    it("Criar Less", function(){
      Popup.criar(scope,null).then(function (popup) {
        expect(popup).toBeDefined();
      }, function (err) {
        expect(err).toBeDefined();
      });
    });
  });
})
