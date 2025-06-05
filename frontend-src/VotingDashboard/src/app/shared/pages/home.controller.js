(function () {
	'use strict';

	angular
		.module('app.shared')
		.component('appHome', {
			templateUrl: 'src/app/shared/pages/home.html',
			controller: HomeController,
			controllerAs: 'vm'
		});

	HomeController.$inject = ['Logger', 'AuthService', 'UserService'];

	function HomeController(Logger, AuthService, UserService) {
		var vm = this;
		vm.user = UserService.getUser();
		vm.isAuthenticated = AuthService.isAuthenticated();
	}
})();