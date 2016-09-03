'use strict';
describe('UsuarioModel', function() {
  var usuarioModel;

  beforeEach(module('ionic'));

  beforeEach(module('com.ionic.quickstart.model.usuario'));

  beforeEach(inject(function($injector){
    usuarioModel = $injector.get('UsuarioModel');
  }));

  describe('UsuarioModel', function(){
    it('é definido', function(){
      expect(usuarioModel).toBeDefined();
    });
  });
});
