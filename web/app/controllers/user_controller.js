MovieLibrary.controller('UserController', function ($scope, $location, AuthenticationService) {
 
    if (AuthenticationService.getUserLoggedIn()) {
      $location.path('/movies');
  }

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