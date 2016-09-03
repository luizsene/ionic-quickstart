(function () {
  'use strict';
  angular.module('com.ionic.quickstart.ionic-http-offline-cache', [])
  .provider('httpOfflineCache', function () {
    var APPLICATION_JSON = 'application/json';
    var CONTENT_TYPE_APPLICATION_JSON = {'Content-Type': APPLICATION_JSON + ';charset=utf-8'};
    var JSON_START = /^\[|^\{(?!\{)/;
      var JSON_ENDS = {
        '[': /]$/,
        '{': /}$/
      };
      var JSON_PROTECTION_PREFIX = /^\)\]\}',?\n/;

      function shallowCopy(src, dst) {
        if (angular.isArray(src)) {
          dst = dst || [];

          for (var i = 0, ii = src.length; i < ii; i++) {
            dst[i] = src[i];
          }
        } else if (angular.isObject(src)) {
          dst = dst || {};

          for (var key in src) {
            if (!(key.charAt(0) === '$' && key.charAt(1) === '$')) {
              dst[key] = src[key];
            }
          }
        }
        return dst || src;
      }

      function isFile(obj) {
        return toString.call(obj) === '[object File]';
      }

      function isBlob(obj) {
        return toString.call(obj) === '[object Blob]';
      }

      function isFormData(obj) {
        return toString.call(obj) === '[object FormData]';
      }

      function isJsonLike(str) {
        var jsonStart = str.match(JSON_START);
        return jsonStart && JSON_ENDS[jsonStart[0]].test(str);
      }

      function defaultHttpResponseTransform(data, headers) {
        if (angular.isString(data)) {
          // Strip json vulnerability protection prefix and trim whitespace
          var tempData = data.replace(JSON_PROTECTION_PREFIX, '').trim();

          if (tempData) {
            var contentType = headers('Content-Type');
            if ((contentType && (contentType.indexOf(APPLICATION_JSON) === 0)) || isJsonLike(tempData)) {
              data = angular.fromJson(tempData);
            }
          }
        }

        return data;
      }

      this.defaults = {
        // transform incoming response data
        transformResponse: [defaultHttpResponseTransform],

        // transform outgoing request data
        transformRequest: [function (d) {
          return angular.isObject(d) && !isFile(d) && !isBlob(d) && !isFormData(d) ? angular.toJson(d) : d;
        }],

        // default headers
        headers: {
          common: {
            'Accept': 'application/json, text/plain, */*'
          },
          post: shallowCopy(CONTENT_TYPE_APPLICATION_JSON),
          put: shallowCopy(CONTENT_TYPE_APPLICATION_JSON),
          patch: shallowCopy(CONTENT_TYPE_APPLICATION_JSON)
        },

        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',

        paramSerializer: '$httpParamSerializer'
      };

      this.$get = ["$window", "$http", "$q", "httpOfflineCacheStorage",
      function ($window, $http, $q, httpOfflineCacheStorage) {

        var $cordovaNetwork = $window.navigator && $window.navigator.connection,
        CONNECTION_NONE = $window.Connection && $window.Connection.NONE;

        function cachedGetRequest(url, config) {
          if (isOffline()) {
            return getCachedRequestPromise(url, config);
          } else {
            return $http.get(url, config)
            .then(function (response) {
              return persistResponse(response, url, config);
            })
            .catch(function (response) {
              if (!response.status) {
                // offline
                return getCachedRequestPromise(url, config);
              } else {
                // client or server HTTP error
                return $q.reject(response);
              }
            }
          );
        }
      }

      function isOffline() {
        $cordovaNetwork = $window.navigator && $window.navigator.connection;
        CONNECTION_NONE = $window.Connection && $window.Connection.NONE;
        if ($cordovaNetwork) {
          return $cordovaNetwork['type'] === CONNECTION_NONE;
        } else {
          return false;
        }
      }

      function getCachedRequestPromise(url, config) {
        return httpOfflineCacheStorage.get(url).then(function (data) {
          if (data) {
            return data.response;
          } else {
            // return offline response
            return $q.reject({
              status: 0,
              data: '',
              headers: function () {
                return '';
              },
              config: config,
              statusText: ''
            });
          }
        });
      }

      // Store successful response in the storage
      function persistResponse(response, url, config) {
        httpOfflineCacheStorage.set(url, {response: response, config: config});
        return response;
      }


      function HttpOfflineCache(configuration) {
        if (configuration && configuration.method === 'GET') {
          return cachedGetRequest(configuration.url, configuration);
        } else {
          return $http(configuration);
        }
      }

      // methods
      HttpOfflineCache.get = cachedGetRequest;
      HttpOfflineCache.head = $http.head.bind($http);
      HttpOfflineCache.post = $http.post.bind($http);
      HttpOfflineCache.put = $http.put.bind($http);
      HttpOfflineCache.delete = $http.delete.bind($http);
      HttpOfflineCache.jsonp = $http.jsonp.bind($http);
      HttpOfflineCache.patch = $http.patch.bind($http);
      HttpOfflineCache.isOffline = isOffline;
      // properties
      HttpOfflineCache.pendingRequests = $http.pendingRequests;
      HttpOfflineCache.defaults = $http.defaults;

      return HttpOfflineCache;
    }];
  })
  //
  // Another method is to set global interceptor
  // $httpProvider.interceptors.push(function ($q) {
  // return {
  //     'responseError': function (responseError) {
  //         // do something on error
  //         if (canRecover(rejection)) {
  //             return responseOrNewPromise
  //         }
  //         return $q.reject(rejection);
  //     }
  //};
  .provider('httpOfflineCacheStorage', function () {
    var BACKEND_SQLITE = 'sqlite',
    BACKEND_LOCALSTORAGE = 'localStorage',
    BACKEND_INMEMORY = 'inMemory';

    var availableBackends = [BACKEND_SQLITE, BACKEND_LOCALSTORAGE, BACKEND_INMEMORY],
    backends = [BACKEND_SQLITE, BACKEND_LOCALSTORAGE, BACKEND_INMEMORY],
    backend,
    stub;

    this.setBackends = function (newBackends) {
      newBackends.forEach(function (item) {
        if (availableBackends.indexOf(item) < 0) {
          throw new Error('Invalid backend type for HttpOfflineCache ' + item);
        }
      });
      backends = newBackends;
    };

    this.$get = ['$window', '$q', function ($window, $q) {

      function sqliteStorageFactory() {
        var $cordovaSQLite,
        db;

        $cordovaSQLite = $window.sqlitePlugin || $window.SQLitePlugin;

        function openDb() {
          if (!$cordovaSQLite) return $q.reject(false);
          if (db) return $q.resolve(true);
          db = $cordovaSQLite.openDatabase({name: "httpOfflineCache.db", location: 2});
          if (!db) {
            throw new Error('SQLite3 could not be initialized');
          }
          return executeSql('CREATE TABLE IF NOT EXISTS items (id TEXT PRIMARY KEY, val TEXT)').then(function () {
            return true;
          });
        }

        function executeSql(sql, args) {
          var defer = $q.defer();
          args = args || [];
          openDb().then(function () {
            db.transaction(function (tx) {
              tx.executeSql(sql, args,
                function (tx, res) {
                  defer.resolve(res);
                },
                function (e) {
                  console.log("SQlite statement error: " + e.message);
                  defer.reject(e);
                }
              );
            }, function (e) {
              console.log("SQlite trx error: " + e.message);
              defer.reject(e);
            });
          });
          return defer.promise;
        }


        return {
          isSupported: !!$cordovaSQLite,
          clear: function () {
            return executeSql('DELETE FROM items');
          },
          has: function (key) {
            return executeSql('SELECT val FROM items WHERE id = ?', [key]).then(function (res) {
              return res.rows.length > 0;
            });
          },
          get: function (key) {
            return executeSql('SELECT val FROM items WHERE id = ?', [key]).then(function (res) {
              if (res.rows.length > 0) {
                var stringValue = res.rows.item(0).val;
                if (stringValue === null || typeof stringValue === 'undefined') {
                  return undefined;
                }
                return angular.fromJson(stringValue);
              } else {
                return undefined;
              }
            });
          },
          set: function (key, value) {
            var stringValue = angular.toJson(value);
            return executeSql('REPLACE INTO items(id, val) VALUES (?, ?)', [key, stringValue]);
          },
          remove: function (key) {
            return executeSql('DELETE FROM items WHERE id = ?', [key]);
          }
        };
      }

      function localStorageFactory() {
        var PREFIX = 'httpCache-';
        return {
          isSupported: (function () {
            try {
              return 'localStorage' in $window && $window['localStorage'] !== null;
            } catch (e) {
              return false;
            }
          })(),
          clear: function () {
            for (var i = $window.localStorage.length - 1; i >= 0; i--) {
              var keyName = $window.localStorage.key(i);
              if (keyName.indexOf(PREFIX) === 0) {
                $window.localStorage.removeItem(keyName);
              }
            }
            return $q.resolve(true);
          },
          has: function (key) {
            return $q.resolve(typeof $window.localStorage[PREFIX + key] !== 'undefined');
          },
          get: function (key) {
            var stringValue = $window.localStorage.getItem(PREFIX + key);
            if (stringValue === null || typeof stringValue === 'undefined') {
              return $q.resolve(undefined);
            }
            return $q.resolve(angular.fromJson(stringValue));
          },
          set: function (key, value) {
            var that = this,
            stringValue = angular.toJson(value);
            try {
              $window.localStorage.setItem(PREFIX + key, stringValue);
            } catch (e) {
              // handle oveflow case with roll-over
              that.clear();
            }
            return $q.resolve(true);
          },
          remove: function (key) {
            $window.localStorage.removeItem(PREFIX + key);
            return $q.resolve(true);
          }
        };
      }

      function inMemoryStorageFactory() {
        var values = {};
        return {
          isSupported: true,
          clear: function () {
            values = {};
            return $q.resolve(true);
          },
          has: function (key) {
            return $q.resolve(typeof values[key] !== 'undefined');
          },
          get: function (key) {
            return $q.resolve(values[key]);
          },
          set: function (key, value) {
            values[key] = value;
            return $q.resolve(true);
          },
          remove: function (key) {
            delete values[key];
            return $q.resolve(true);
          }
        };
      }

      function lazyStubFactory() {
        stub = {
          startup: startup,
          clear: function () {
            if (!backend) startup();
            return backend.clear();
          },
          has: function (key) {
            if (!backend) startup();
            return backend.has(key);
          },
          get: function (key) {
            if (!backend) startup();
            return backend.get(key);
          },
          set: function (key, value) {
            if (!backend) startup();
            return backend.set(key, value);
          },
          remove: function (key) {
            if (!backend) startup();
            return backend.remove(key);
          }
        };
        return stub;
      }

      function startup() {
        backend = null;
        backends.forEach(function (backendType) {
          if (backend) return;
          if (backendType === BACKEND_SQLITE) {
            backend = sqliteStorageFactory();
          } else if (backendType === BACKEND_LOCALSTORAGE) {
            backend = localStorageFactory();
          } else if (backendType === BACKEND_INMEMORY) {
            backend = inMemoryStorageFactory();
          } else {
            throw new Error('Invalid backend type for HttpOfflineCache ' + backendType);
          }
          stub.type = backend.type = backendType;
          if (!backend.isSupported) {
            backend = null;
          }
        });
        if (!backend) {
          throw new Error('No active storage backend for HttpOfflineCache ');
        }
        return backend;
      }

      // Select best backend
      return lazyStubFactory();
    }];
  });
})();
