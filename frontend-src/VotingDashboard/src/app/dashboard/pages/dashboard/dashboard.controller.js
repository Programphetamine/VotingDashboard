(function () {
	'use strict';

	angular
		.module('app.dashboard')
		.component('appDashboard', {
			templateUrl: 'src/app/dashboard/pages/dashboard/dashboard.html',
			controller: DashboardController,
			controllerAs: 'vm'
		});

	DashboardController.$inject = ['Logger', 'AuthService', 'UserService',];

	function DashboardController(Logger, AuthService, UserService) {
		var vm = this;
		vm.user = UserService.getUser();
		vm.isAuthenticated = AuthService.isAuthenticated();
		Logger.info('DashboardController loaded');
	}
})();
