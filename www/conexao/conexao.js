/**
* @ngdoc service
* @name com.ionic.quickstart.conexao.connect:connect
* @author Fábio Pereira <fabio.pereira.gti@gmail.com>
* @description
* Serviço responsável por verificar a autenticação do usuario do aplicativo
* @requires $http
* @requires $q
* @requires $CONSTANT_BASE_URL
* @requires httpOfflineCache
*/

(function () {
  'use strict';
  angular.module('com.ionic.quickstart.conexao.conexao', [])
  .service('conexaoHttp',
    [
      '$http',
      '$q',
      'CONSTANT_BASE_URL',
      'httpOfflineCache',
      function (
        $http,
        $q,
        CONSTANT_BASE_URL,
        httpOfflineCache
      ) {

        /**
        * @ngdoc property
        * @name com.ionic.quickstart.conexao.connect:connect#self
        * @propertyOf com.ionic.quickstart.conexao.connect:connect
        * @returns {object}  Variavel proxy resposável por refenciar a própia instancia
        */
        var self = this;


          /**
          * @ngdoc method
          * @name com.ionic.quickstart.conexao.connect:connect#get
          * @methodOf com.ionic.quickstart.conexao.connect:connect
          * @description Responsável por "PEGAR" informações na API, recebe no corpo sempre um JSON.
          * <pre>
          options: {
          url: 'exemplo.com.br/api?key=value&key1=value1',
          config: "{'key': 'value'}"
        }
        * </pre>
        * @returns {Object} retorna uma promise contendo as informações provenientes do servidor
        */
        self.get = function (options) {
          return $http.get(CONSTANT_BASE_URL.concat(options.url), options.config);
        };


          /**
          * @ngdoc method
          * @name com.ionic.quickstart.conexao.connect:connect#getCache
          * @methodOf com.ionic.quickstart.conexao.connect:connect
          * @description Responsável por "PEGAR" e salvar em cache informações na API, recebe
            no corpo sempre um JSON.
          * <pre>
            options: {
            url: 'exemplo.com.br/api?key=value&key1=value1',
            config: "{'key': 'value'}"
          }
        * </pre>
        * @returns {Object} retorna uma promise contendo as informações provenientes do
          servidor ou da area de cache
        */

        self.getCache = function (options) {
          return httpOfflineCache.get(CONSTANT_BASE_URL.concat(options.url), options.config);
        };


          /**
          * @ngdoc method
          * @name com.ionic.quickstart.conexao.connect:connect#post
          * @methodOf com.ionic.quickstart.conexao.connect:connect
          * @description Responsável por criar um novo recurso na API, sempre enviando
            dados no formato JSON.
          * <pre>
          options: {
          url: 'exemplo.com.br/api',
          data: "{'key': 'value'}",
          config: "{'key': 'value'}"
        }
        * </pre>
        * @returns {Object} retorna uma promise contendo as informações provenientes do servidor
        */
        self.post = function (options) {
          return $http.post(CONSTANT_BASE_URL.concat(options.url), options.data, options.config);
        };


          /**
          * @ngdoc method
          * @name com.ionic.quickstart.conexao.connect:connect#put
          * @methodOf com.ionic.quickstart.conexao.connect:connect
          * @description Responsável por fazer atualizações por completo em um Recurso, possui
            carga de rede menor que o post
          * <pre>
            options: {
            url: 'exemplo.com.br/api',
            data: "{'key': 'value'}",
            config: "{'key': 'value'}"
          }
        * </pre>
        * @returns {Object} retorna uma promise contendo as informações provenientes do servidor
        */
        self.put = function (options) {
          return $http.put(CONSTANT_BASE_URL.concat(options.url), options.data, options.config);
        };



        /**
        * @ngdoc method
        * @name com.ionic.quickstart.conexao.connect:connect#patch
        * @methodOf com.ionic.quickstart.conexao.connect:connect
        * @description Respomsável por atualizar pequenas partes de  um recurso similiar ao POST,
          no entanto possui uma latência de dados menor.
        * <pre>
        options: {
        url: 'exemplo.com.br/api',
        data: "{'key': 'value'}",
        config: "{'key': 'value'}"
        }
        * </pre>
        * @returns {Object} retorna uma promise contendo as informações provenientes do servidor
        */
        self.patch = function (options) {
          return $http.patch(CONSTANT_BASE_URL.concat(options.url), options.data, options.config);
        };


        /**
        * @ngdoc method
        * @name com.ionic.quickstart.conexao.connect:connect#delete
        * @methodOf com.ionic.quickstart.conexao.connect:connect
        * @description Responsável pela exclusão de um recurso presente na API.
        * <pre>
        options: {
        url: 'exemplo.com.br/api?key=value&key1=value1',
        config: "{'key': 'value'}"
        }
        * </pre>
        * @returns {Object} retorna uma promise contendo as informações provenientes do servidor
        */
        self.delete = function (options) {
          return $http.delete(CONSTANT_BASE_URL.concat(options.url), options.config);
        };
      }]
    );
})();
