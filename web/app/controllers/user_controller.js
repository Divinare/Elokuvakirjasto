MovieLibrary.controller('UserController', function ($scope, $location, AuthenticationService) {

    $scope.message = ""
    AuthenticationService.checkLoggedIn().then(function (value) {
        $scope.userLoggedIn = value
    })
    $scope.$on('loginChange', function (event, data) {
        AuthenticationService.checkLoggedIn().then(function (value) {
            $scope.userLoggedIn = value
        })
    })

    $scope.logIn = function () {
        AuthenticationService.logUserIn($scope.email, $scope.password)
                .then(function () {
                    $location.path('/movies');
                })
                .catch(function () {
                    $scope.message = 'Wrong email or password'
                });
    }

    $scope.register = function () {
        AuthenticationService.createUser($scope.newEmail, $scope.newPassword)
                .then(function () {
                    AuthenticationService.logUserIn($scope.newEmail, $scope.newPassword)
                            .then(function () {
                                $location.path('/movies');
                            });
                })
                .catch(function () {
                    $scope.message = 'Mistake! Try again';
                });
    }
});