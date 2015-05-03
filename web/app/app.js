var MovieLibrary = angular.module('MovieLibrary', ['ngRoute', 'firebase']);

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