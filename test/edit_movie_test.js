describe('Edit movie', function () {
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
                        done(movie1)
                    } else {
                        done(null)
                    }
                },
                editMovie: function (movie) {
                    if (scope.movie.name === '' || scope.movie.director === '' || scope.movie.year === '' || scope.movie.description === '') {
                        return;
                    }
                    movie1 = movie;
                }
            }
        })();

        RouteParamsMock = (function () {
            return {
                id: 0
            };
        })();
        spyOn(FirebaseServiceMock, 'getMovie').and.callThrough();
        spyOn(FirebaseServiceMock, 'editMovie').and.callThrough();

        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Muista vaihtaa oikea kontrollerin nimi!
            controller = $controller('ShowMovieController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock,
                $routeParams: RouteParamsMock
            });
        });
    });

    it('should fill the edit form with the current information about the movie', function () {
        expect(scope.movie.name).toEqual('Men in black');
        expect(scope.movie.director).toEqual('Jason');
        expect(scope.movie.year).toEqual(2000);
        expect(scope.movie.description).toEqual('Great movie');
        expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
    })


    it('should be able to edit a movie by its name, director, release date and description', function () {
        var movie = {};
        scope.movie.name = 'new name';
        scope.movie.director = 'someone';
        scope.movie.year = 2015;
        scope.movie.description = 'lorem ipsum...';
        FirebaseServiceMock.editMovie(movie);
        expect(scope.movie.name).toEqual('new name');
        expect(scope.movie.director).toEqual('someone');
        expect(scope.movie.year).toEqual(2015);
        expect(scope.movie.description).toEqual('lorem ipsum...');
        expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
    });

    it('should not be able to edit a movie if its name, director, release date or description is empty', function () {
        scope.movie.name = '';
        scope.movie.director = 'someone';
        scope.movie.year = 2015;
        scope.movie.description = 'lorem ipsum...';
        scope.editMovie(scope.movie);
        
        scope.movie.name = 'new name';
        scope.movie.director = '';
        scope.movie.year = 2015;
        scope.movie.description = 'lorem ipsum...';
        scope.editMovie(scope.movie);

        scope.movie.name = 'new name';
        scope.movie.director = 'someone';
        scope.movie.year = '';
        scope.movie.description = 'lorem ipsum...';
        scope.editMovie(scope.movie);

        scope.movie.name = 'new name';
        scope.movie.director = 'someone';
        scope.movie.year = 2015;
        scope.movie.description = '';
        scope.editMovie(scope.movie);

        expect(FirebaseServiceMock.editMovie).not.toHaveBeenCalled();
    });
});