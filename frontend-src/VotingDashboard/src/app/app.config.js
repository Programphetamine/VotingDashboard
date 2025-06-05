(function() {
    'use strict';
    
    angular
        .module('app')
        .config(AppConfig)
        .run(AppRun);
    
    AppConfig.$inject = ['$httpProvider'];
    
    function AppConfig($httpProvider) {
        $httpProvider.interceptors.push(['$q', '$injector', function($q, $injector) {
            return {
                responseError: function(rejection) {
                    if (rejection.status === 401) {
                        const AuthService = $injector.get('AuthService');
                        const isTokenValid = AuthService.tokenIsValid();
                        if (!isTokenValid) {
                            AuthService.logout();
                            const UserService = $injector.get('UserService');
                            UserService.handleLogout();
                            const $location = $injector.get('$location');
                            $location.path('/login');
                        }
                    }
                    return $q.reject(rejection);
                }
            };
        }]);
    }
    
    AppRun.$inject = ['$rootScope', '$location', 'Logger', 'AuthService'];
    
    function AppRun($rootScope, $location, Logger, AuthService) {
        $rootScope.appName = 'Voting Dashboard';
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            const restricted = ['/dashboard'];
      
            if (restricted.includes(next.originalPath) && !AuthService.isAuthenticated()) {
              event.preventDefault();
              $location.path('/login');
            }
          });
        $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
            Logger.error('Route change error', rejection);
        });
        
        Logger.info('AngularJS Voting Dashboard Application Started');
    }
    
})();
