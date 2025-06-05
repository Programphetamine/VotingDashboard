(function() {
    'use strict';
    
    angular
        .module('app')
        .config(RoutingConfig);
    
    RoutingConfig.$inject = ['$routeProvider', '$locationProvider'];
    
    function RoutingConfig($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                template: '<app-home></app-home>'
            })
            .when('/login', {
                template: '<app-login></app-login>'
            })
            .when('/dashboard', {
                template: '<app-dashboard></app-dashboard>'
            })
            .otherwise({ 
                redirectTo: '/' 
            });

        $locationProvider.html5Mode(true).hashPrefix('');
    }
    
})(); 