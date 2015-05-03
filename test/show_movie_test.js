describe('Show movie', function () {
    var controller, scope;

    var FirebaseServiceMock, RouteParamsMock;

    beforeEach(function () {
        module('MovieLibrary');

        FirebaseServiceMock = (function () {
            var movie1 = {
                name: 'Men in black',
                director: 'Jason',
                year: 2000,
                description: 'Great movie'
            };

            return {
                getMovie: function (id, done) {
                    if (id === 0) {
                        done(movie1);
                    } else {
                        done(null);
                    }
                }
            }
        })();

        RouteParamsMock = (function () {
            return {
                id: 0
            }
        })();

        spyOn(FirebaseServiceMock, 'getMovie').and.callThrough();

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            controller = $controller('ShowMovieController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock,
                $routeParams: RouteParamsMock
            });
        });
    });

    it('should show current movie from Firebase', function () {
        expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
        expect(scope.movie.name).toBe("Men in black");
        expect(scope.movie.director).toBe("Jason");
        expect(scope.movie.year).toBe(2000);
        expect(scope.movie.description).toBe("Great movie");
    });
});