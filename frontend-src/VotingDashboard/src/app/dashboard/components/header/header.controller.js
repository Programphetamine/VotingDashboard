(function () {
	'use strict';

	angular
		.module('app.dashboard')
		.component('appHeader', {
			templateUrl: 'src/app/dashboard/components/header/header.html',
			controller: HeaderController,
			controllerAs: 'vm'
		});

	HeaderController.$inject = ['$injector', 'Logger', 'AuthService', 'UserService'];

	function HeaderController($injector, Logger, AuthService, UserService) {
		var vm = this;
		vm.user = UserService.getUser();
		vm.isAuthenticated = AuthService.isAuthenticated();

		vm.menuItems = [
			{ icon: 'fa-solid fa-user', text: 'APPLY FOR ABSENTEE BALLOT' },
			{ icon: 'fa-solid fa-location-dot', text: 'FIND POLLING/VOTING LOCATIONS' },
			{ icon: 'fa-solid fa-home', text: 'UPDATE YOUR ADDRESS' },
			{ icon: 'fa-solid fa-user', text: 'UPDATE YOUR NAME' },
		]
		if (!vm.isAuthenticated) {
			var $location = $injector.get('$location');
			$location.path('/login');
			Logger.info('Redirecting to login page');
		}
		vm.logout = function() {
			AuthService.logout();
			UserService.handleLogout();
			Logger.info('User logged out successfully');
		};

		vm.$onInit = function () {
			Logger.info('Header component initialized');
		};
		vm.isLoggedIn = function() {
			return UserService.isLoggedIn();
		};
	}
})();
