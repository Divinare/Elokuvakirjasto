MovieLibrary.controller('ListController', function ($scope, FirebaseService) {

    $scope.movies = FirebaseService.getMovies();

    $scope.removeAllMovies = function () {
        angular.forEach($scope.movies, function (movie) {
            FirebaseService.removeMovie(movie);
        });
    };


    $scope.removeMovie = function (movie) {
        FirebaseService.removeMovie(movie);

    };

    $scope.editMovie = function (movie) {
        FirebaseService.editMovie(movie);
    };

});