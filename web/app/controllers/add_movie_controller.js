MovieLibrary.controller('AddMovieController', function ($scope, FirebaseService) {


    $scope.addMovie = function () {

        var name = $scope.name === undefined || $scope.name === null || $scope.name === '';
        var director = $scope.director === undefined || $scope.director === null || $scope.director === '';
        var year = $scope.year === undefined || $scope.year === null || $scope.year < 1950 || $scope.year > 2020;
        var description = $scope.description === undefined || $scope.description === null || $scope.description === '';

        if (!name && !director && !year && !description) {
            FirebaseService.addMovie({
                name: $scope.name,
                director: $scope.director,
                year: $scope.year,
                description: $scope.description
            });

            $scope.name = '';
            $scope.director = '';
            $scope.year = '';
            $scope.description = '';
        }
    };
});