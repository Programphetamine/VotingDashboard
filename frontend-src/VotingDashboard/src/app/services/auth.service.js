(function () {
    'use strict';
  
    angular
      .module('app')
      .factory('AuthService', AuthService);
    
    AuthService.$inject = ['$q', '$location'];

    function AuthService($q, $location) {
      var STORAGE_KEY = 'accessToken';
      var accessToken = localStorage.getItem(STORAGE_KEY) || null;
  
      return {
        login,
        logout,
        isAuthenticated,
        tokenIsValid
      };
  
      function login(username, password) {
        return $q(function(resolve, reject) {
          setTimeout(function() {
            if (username && password) {
              accessToken = '123';
              localStorage.setItem('accessToken', accessToken);
              resolve();
            } else {
              reject('Invalid credentials');
            }
          }, 500);
        });
      }
  
      function logout() {
        accessToken = null;
        localStorage.removeItem('accessToken');
        $location.path('/');
      }

      function isAuthenticated() {
        return tokenIsValid();
      }

      function tokenIsValid() {
        return !!accessToken;
      }
    }
  })();
