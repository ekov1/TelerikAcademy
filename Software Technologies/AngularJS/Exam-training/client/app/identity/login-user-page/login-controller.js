(function () {

    function loginController($location, auth) {
        var vm = this;

        vm.cancel = function cancelHandler() {
            $location.path('#/home');
        }

        vm.loginUser = function loginUserHandler(user, loginForm) {
            if (loginForm.$valid) {
                auth.login(user)
                    .then(function (data) {
                        toastr.success('Successful login.');
                        $location.path('home');
                    }, function (response) {
                        console.log('Error in promise at loginController:');
                        console.log(response);
                    });
            } else {
                toastr.error('Invalid data');
            }
        }
    }

    angular
        .module('MyApp.controllers')
        .controller('LoginController', ['$location', 'auth', loginController])
})();
