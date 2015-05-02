var MovieLibrary = angular.module('MovieLibrary', ['ngRoute', 'firebase']);

MovieLibrary.service('FirebaseService', function ($firebase) {
    var firebaseRef = new Firebase('https://sweltering-heat-7612.firebaseio.com/movies');
    var sync = $firebase(firebaseRef);
    var movies = sync.$asArray();

    this.getMovies = function () {
        return movies;
    }
    
    this.getMovie = function(key, done){
        movies.$loaded(function(){
          done(movies.$getRecord(key));
        });
    }

    this.addMovie = function (movie) {
        movies.$add(movie);
    }
    
    this.editMovie = function (movie) {
        movies.$save(movie);
    }

    this.removeMovie = function (movie) {
        movies.$remove(movie);
    }

});

MovieLibrary.controller('ListController', function($scope, FirebaseService){

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

MovieLibrary.controller('AddMovieController', function ($scope, FirebaseService) {


    $scope.addMovie = function () {

    var name = $scope.name === undefined || $scope.name === null || $scope.name === '';
    var director = $scope.director === undefined || $scope.director === null || $scope.director === '';
    var year = $scope.year === undefined || $scope.year === null || $scope.year < 1950 || $scope.year > 2020;
    var description = $scope.description === undefined || $scope.description === null || $scope.description === '';

        if (!name && !director && !year && !description) {
            console.log("ADDING");
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

MovieLibrary.controller('ShowMovieController', function ($scope, $routeParams, FirebaseService) {
  FirebaseService.getMovie($routeParams.id, function(data){
      $scope.movie = data;
  });
    
});

MovieLibrary.config(function ($routeProvider) {
    
    $routeProvider.when('/', {
            controller: 'ListController',
            templateUrl: 'app/views/list.html'
        })
        .when('/movies', {
            controller: 'ListController',
            templateUrl: 'app/views/list.html'
        })
        .when('/movies/new', {
            controller: 'AddMovieController',
            templateUrl: 'app/views/add_movie.html'
        })
        .when('/movies/:id', {
            controller: 'ShowMovieController',
            templateUrl: 'app/views/show_movie.html'
        })
	.when('/movies/:id/edit', {
		controller: 'ShowMovieController',
		templateUrl: 'app/views/edit.html',
	})
        .otherwise({
            redirectTo: '/'
        });
});