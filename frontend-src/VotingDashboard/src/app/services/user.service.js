(function () {
    'use strict';
  
    angular
      .module('app')
      .factory('UserService', UserService);
  
    function UserService() {
      var STORAGE_KEY = 'currentUser';
      var currentUser = JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
  
      return {
        loadUser,
        getUser,
        isLoggedIn,
        handleLogout
      };
  
      function loadUser(user) {
        currentUser = {
          name: 'Bryce D. Allen',
          email: 'bryce.allen@gmail.com',
          role: 'user'
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
      }
  
      function getUser() {
        return currentUser;
      }
  
      function isLoggedIn() {
        return !!currentUser;
      }

      function handleLogout() {
        currentUser = null;
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  })();
  