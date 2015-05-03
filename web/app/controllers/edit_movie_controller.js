MovieLibrary.controller('EditMovieController', function ($scope, currentAuth, $location, $routeParams, FirebaseService) {
    if (!currentAuth) {
        $location.path('/login');
    }
    
    FirebaseService.getMovie($routeParams.id, function (data) {
        $scope.movie = data;
    });

    $scope.editMovie = function (movie) {

        if ($scope.movie.name !== '' && $scope.movie.year !== '' && $scope.movie.director !== '' && $scope.movie.description !== '') {
            FirebaseService.editMovie(movie);
            $scope.movieName = '';
            $scope.movieDirector = '';
            $scope.movieYear = '';
            $scope.movieDescription = '';
            $location.path('/');
        }
    }

});
