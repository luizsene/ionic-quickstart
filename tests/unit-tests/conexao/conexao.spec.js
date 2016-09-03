describe('Módulo Conexão', function() {
  var conexaoHttp;
  var deferred;

  beforeEach(module('ionic'));
  beforeEach(module('com.ionic.quickstart.utils.constantes'));
  beforeEach(module('com.ionic.quickstart.ionic-http-offline-cache'));
  beforeEach(module('com.ionic.quickstart.conexao.conexao'));

  beforeEach(inject(function ($injector) {
    conexaoHttp = $injector.get('conexaoHttp');
    deferred =  $injector.get('$q').defer();
  }));

  describe('conexaoHttp', function(){
      it('é definido', function(){
        expect(conexaoHttp).toBeDefined();
      })

      it('Método Get', function(){
        conexaoHttp.get({url: 'exemplo.com.br/api?key=value&key1=value1'}).finally(function (value) {
          expect(value).toBeDefined();
        });
      })

      it('Método GetCache', function(){
        conexaoHttp.getCache({url: 'exemplo.com.br/api?key=value&key1=value1'}).finally(function (value) {
          expect(value).toBeDefined();
        });
      })

      it('Método Post', function(){
        conexaoHttp.post({url: 'exemplo.com.br/api?key=value&key1=value1', data: JSON.stringify({})}).finally(function (value) {
          expect(value).toBeDefined();
        });
      })

      it('Método Put', function(){
        conexaoHttp.put({url: 'exemplo.com.br/api?key=value&key1=value1', data: JSON.stringify({})}).finally(function (value) {
          expect(value).toBeDefined();
        });
      })

      it('Método Patch', function(){
        conexaoHttp.patch({url: 'exemplo.com.br/api?key=value&key1=value1', data: JSON.stringify({})}).finally(function (value) {
          expect(value).toBeDefined();
        });
      })

      it('Método Delete', function(){
        conexaoHttp.delete({url: 'exemplo.com.br/api?key=value&key1=value1'}).finally(function (value) {
          expect(value).toBeDefined();
        });
      })
  });

});
