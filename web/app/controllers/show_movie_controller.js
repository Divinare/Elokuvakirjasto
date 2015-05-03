MovieLibrary.controller('ShowMovieController', function ($scope, $location, $routeParams, FirebaseService) {
    FirebaseService.getMovie($routeParams.id, function (data) {
        $scope.movie = data;
    });

});