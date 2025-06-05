(function () {
	'use strict';

	angular
		.module('app.core')
		.component('appLogin', {
			templateUrl: 'src/app/core/pages/auth/login/login.html',
			controller: LoginController,
			controllerAs: 'vm'
		});

	LoginController.$inject = ['$location', 'AuthService', 'UserService'];

	function LoginController($location, AuthService, UserService) {
		var vm = this;

		vm.credentials = {
			username: '',
			password: ''
		};
		vm.login = login;
		vm.errorMessage = '';

		function login() {
			if (!vm.credentials.username || !vm.credentials.password) {
				vm.errorMessage = 'Please enter both username and password';
				return;
			}

			AuthService.login(vm.credentials.username, vm.credentials.password)
				.then(function() {
					UserService.loadUser();
					$location.path('/dashboard');
				})
				.catch(function(error) {
					vm.errorMessage = error || 'Login failed. Please try again.';
				});
		}
	}
})();