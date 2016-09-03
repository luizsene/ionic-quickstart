'use strict';
describe('Utils', function() {

  var bd;

  beforeEach(module('ionic'));

  beforeEach(module('com.ionic.quickstart.utils.localstorage'));

  beforeEach(inject(function($injector){
    bd = $injector.get('$bd');
  }));

  describe('Localstorage', function()  {

    it('before_insert_or_update', function () {
      var res = bd.insert('msg', 'olá como vai?');
      var res2 = bd.update('msg', 'Olá boa noite.');
      var msg = bd.get('msg');

      expect(res).toBe(true);
      expect(res2).toBe(true);
      expect(msg._value).toBe('Olá boa noite.');
    })

    it('insert OK', function(){
      var res = bd.insert('nome', {nome: 'fabio'});
      expect(res).toBe(true);
    })

    it('insert Err', function(){
      var res = bd.insert('err', null);
      expect(res.message).toBe('Valores inválidos');
    })

    it('get OK', function () {
      var res = bd.get('nome');
      expect(res).toBeDefined();
      expect(res.nome).toBe('fabio');
    })

    it('get Err', function () {
      var res = bd.get('');
      expect(res).toBeDefined();
      expect(res.message).toBe('Chave informada está vazia');
    })

    it('update OK', function () {
      var res = bd.update('nome', {nome: 'felipe'});
      expect(res).toBe(true);

      res = bd.get('nome');
      expect(res.nome).toBe('felipe');
    })

    it('update Err', function () {
      var res = bd.update('');
      expect(res).toBeDefined();
      expect(res.message).toBe('Valores inválidos');
    })

    it('up_insert OK', function () {
      var res = bd.up_insert('teste', {teste: 'false'});
      var res2 = bd.up_insert('teste', {teste: 'true'});

      expect(res).toBe(true);
      expect(res2).toBe(true);
    })

    it('up_insert Err', function () {
      var res = bd.up_insert('teste', null);
      var res2 = bd.up_insert(null, null);
      var res3 = bd.up_insert('',{teste: "OK"});

      expect(res.message).toBe('Valores inválidos');
      expect(res2.message).toBe('Valores inválidos');
      expect(res3.message).toBe('Valores inválidos');
    })

    it('delete OK', function () {
      var res = bd.delete('nome');
      expect(res).toBe(true);
    })

    it('delete Err', function () {
      var res = bd.delete('nada');
      expect(res).toBe(null);
    })

    it('drop OK', function () {
      var res = bd.drop();
      var res2 = bd.get('nome');

      expect(res).toBe(true);
      expect(res2).toBe(null);
    })


  });
});
