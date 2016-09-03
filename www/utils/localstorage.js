/**
* @ngdoc service
* @name com.ionic.quickstart.utils.localstorage:$bd
* @author Fábio Pereira <fabio.pereira.gti@gmail.com>
* @description
* Serviço de encapsulamento do localstorage HTML5
* @requires $window
* @requires $q
*/
(function () {
  'use strict';
  angular.module('com.ionic.quickstart.utils.localstorage', [])
  .service('$bd', ['$q', '$window', function ($q, $window) {

    /**
    * @ngdoc property
    * @name com.ionic.quickstart.utils.localstorage:$bd#cx
    * @propertyOf com.ionic.quickstart.utils.localstorage:$bd
    * @description
    * Objeto que encapsula a conexão com o localstorage
    */
    var cx = $window.localStorage;

    /**
    * @ngdoc property
    * @name com.ionic.quickstart.utils.localstorage:$bd#self
    * @propertyOf com.ionic.quickstart.utils.localstorage:$bd
    * @description
    * variavel proxy
    */
    var self = this;


    /**
    * @ngdoc method
    * @name com.ionic.quickstart.utils.localstorage:$bd#before_insert_or_update
    * @methodOf com.ionic.quickstart.utils.localstorage:$bd
    * @param {String | Array | Object} valor - valor a ser inserido no banco
    * @description
    * Caso seja um objeto é executado um scape para String (JSON.stringify)
    * @return {String | Object | Array | Char} valor - Formatado no padrão Javascript
    */
    function before_insert_or_update (valor) {
      return angular.isObject(valor)
      ?
      JSON.stringify(valor)
      :
      before_insert_or_update({_value: valor});
    }

    /**
    * @ngdoc method
    * @name com.ionic.quickstart.utils.localstorage:$bd#before_get
    * @methodOf com.ionic.quickstart.utils.localstorage:$bd
    * @param {String | Array | Object} valor - valor a ser retornado do banco
    * @description
    * Faz uma conversão para Javascript Object (JSON.parse)
    * @return {String | Object | Array | Char} valor - Formatado no padrão Javascript
    */
    function before_get(valor) {
      return JSON.parse(valor);
    }

    /**
    * @ngdoc method
    * @name com.ionic.quickstart.utils.localstorage:$bd#get
    * @methodOf com.ionic.quickstart.utils.localstorage:$bd
    * @param {String} chave - valor a ser buscado no banco
    * @description
    * Faz uma busca no BD pela chave informada
    * @return {String | Object | Array | Char} res - resultado da busca
    */
    self.get = function (chave) {
      var res = null;
      if(chave){
        res = (before_get(cx.getItem(chave)));
      }else{
        res = new Error('Chave informada está vazia');
      }
      return res;
    };

    /**
    * @ngdoc method
    * @name com.ionic.quickstart.utils.localstorage:$bd#insert
    * @methodOf com.ionic.quickstart.utils.localstorage:$bd
    * @param {String} chave - valor da chave a ser salvo no banco
    * @param {String | Object | Array | Char | Integer} valor - valor a ser salvo no BD
    * @description
    * Insere um valor de acordo com a chave
    * @return {Null | Booleam} res - resultado do insert
    */
    self.insert = function (chave, valor) {
      var res = null;
      if(chave && !cx.getItem(chave) && valor){
        cx.setItem(chave, before_insert_or_update(valor));
        res = !0;
      }else{
        res = new Error('Valores inválidos');
      }
      return res;
    };

    /**
    * @ngdoc method
    * @name com.ionic.quickstart.utils.localstorage:$bd#update
    * @methodOf com.ionic.quickstart.utils.localstorage:$bd
    * @param {String} chave - valor da chave ser buscada no banco
    * @param {String | Object | Array | Char | Integer} valor - valor a ser atualizado no BD
    * @description
    * Atualiza um valor de acordo com a chave informada
    * @return {Null | Booleam } res - resultado do update
    */
    self.update = function (chave, valor) {
      var res = null;
      if(chave && cx.getItem(chave) && valor){
        cx.setItem(chave, before_insert_or_update(valor));
        res = !0;
      }else{
        res = new Error('Valores inválidos');
      }
      return res;
    };

    /**
    * @ngdoc method
    * @name com.ionic.quickstart.utils.localstorage:$bd#up_insert
    * @methodOf com.ionic.quickstart.utils.localstorage:$bd
    * @param {String} chave - valor da chave ser buscada no banco
    * @param {String | Object | Array | Char | Integer} valor - valor a ser atualizado no BD
    * @description
    * Atualiza caso existe senão insere um novo valor de acordo com a chave
    * @return {Null | Booleam } res - resultado do update
    */
    self.up_insert = function (chave, valor) {
      var res = null;
      if(self.get(chave)){
        res = self.update(chave, valor);
      }else{
        res = self.insert(chave, valor);
      }
      return res;
    };


    /**
    * @ngdoc method
    * @name com.ionic.quickstart.utils.localstorage:$bd#delete
    * @methodOf com.ionic.quickstart.utils.localstorage:$bd
    * @param {String} chave - valor da chave ser deletada no banco
    * @description
    * Deleta um item por uma chave informada
    * @return {Null | Booleam } res - resultado do update
    */
    self.delete = function (chave) {
      var res = null;
      if(chave && cx.getItem(chave)){
        cx.removeItem(chave);
        res = !0;
      }
      return res;
    };

    /**
    * @ngdoc method
    * @name com.ionic.quickstart.utils.localstorage:$bd#drop
    * @methodOf com.ionic.quickstart.utils.localstorage:$bd
    * @description
    * Apaga todo o banco de dados
    * @return {Null | Booleam } res - resultado do update
    */
    self.drop = function () {
      cx.clear();
      return !0;
    };
  }]);
})();
