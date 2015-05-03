var MovieLibrary = angular.module('MovieLibrary', ['ngRoute', 'firebase']);

MovieLibrary.config(function ($routeProvider) {

    $routeProvider.when('/', {
        controller: 'ListController',
        templateUrl: 'app/views/list.html',
        resolve: {
            currentAuth: function (AuthenticationService) {
                return AuthenticationService.checkLoggedIn();
            }
        }
    })
            .when('/movies', {
                controller: 'ListController',
                templateUrl: 'app/views/list.html',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
            .when('/movies/new', {
                controller: 'AddMovieController',
                templateUrl: 'app/views/add_movie.html',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
            .when('/movies/:id', {
                controller: 'ShowMovieController',
                templateUrl: 'app/views/show_movie.html',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
            .when('/movies/:id/edit', {
                controller: 'EditMovieController',
                templateUrl: 'app/views/edit.html',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
            .when('/login', {
                controller: 'UserController',
                templateUrl: 'app/views/login.html'
            })
            .when('/register', {
                controller: 'UserController',
                templateUrl: 'app/views/register.html'
            })
            .when('/logout', {
                controller: 'UserController',
                templateUrl: 'app/views/logout.html',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
            .otherwise({
                redirectTo: '/'
            });
});


MovieLibrary.run(function (AuthenticationService, $rootScope) {
    $rootScope.logOut = function () {
        AuthenticationService.logUserOut();
        $location.path('/login');
    };
    
    $rootScope.userLoggedIn = function () {
        $rootScope.userLoggedIn = AuthenticationService.getUserLoggedIn();
        return $rootScope.userLoggedIn;
    };
});


/*
MovieLibrary.run(function (AuthenticationService, $rootScope, $location) {
    $rootScope.logOut = function () {
        AuthenticationService.logUserOut();
        $location.path('/login');
    };
    
    $rootScope.userLoggedIn = function () {
        $rootScope.userLoggedIn = AuthenticationService.getUserLoggedIn();
        return $rootScope.userLoggedIn;
    };
});



MovieLibrary.run(function (AuthenticationService, $rootScope) {
    $rootScope.logOut = function () {
        AuthenticationService.logUserOut();
        $location.path('/login');
    };

    $rootScope.userLoggedIn = AuthenticationService.getUserLoggedIn();
});

*/

