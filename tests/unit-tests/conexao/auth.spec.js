describe('Módulo Conexão', function() {
  var Auth;
  var deferred;
  var $bd;

  beforeEach(module('ionic'));
  beforeEach(module('com.ionic.quickstart.utils.localstorage'));
  beforeEach(module('com.ionic.quickstart.conexao.auth'));

  beforeEach(inject(function ($injector) {
    Auth = $injector.get('Auth');
    deferred =  $injector.get('$q').defer();
    $bd =  $injector.get('$bd');
  }));

  describe('Auth', function(){
      it('é definido', function(){
        expect(Auth).toBeDefined();
      })
  });

  it('Auth.isAuth OK', function () {
    Auth.isAuth().then(function (value) {
      expect(value).not.toBeNull();
    }, function (err) {
      expect(err).toBeNull();
    })
  });

  it('Auth.isAuth Err', function () {
    $bd.insert('usuario_credenciais', {id: 1, token: 'aaaaaaaaaaa'});
    Auth.isAuth().then(function (value) {
      expect(value).not.toBeNull();
      expect(value).toBe({id: 1, token: 'aaaaaaaaaaa'});
    }, function (err) {
      expect(err).toBeNull();
    })
  })

});
