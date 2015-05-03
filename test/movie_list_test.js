describe('Movie list', function () {
    var controller, scope;

    var FirebaseServiceMock;

    beforeEach(function () {

        module('MovieLibrary');

        FirebaseServiceMock = (function () {

            var movies = [
                {
                    name: 'Men in black',
                    director: 'Jason',
                    year: 2000,
                    description: 'Great movie'
                },
                {
                    name: 'LOTR',
                    director: 'Mike',
                    year: 2005,
                    description: 'Bad movie'
                }
            ];

            return {

                getMovies: function () {
                    return movies;
                },
                removeMovie: function (movie) {

                    for (var i = 0; i < movies.length; i++) {
                        if (movies[i].name === movie.name) {
                            movies.splice(i, 1);
                        }
                    }
                }

            }
        })();

        spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();
        spyOn(FirebaseServiceMock, 'removeMovie').and.callThrough();
        
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();

            controller = $controller('ListController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock
            });
        });
    });

    it('should list all movies from the Firebase', function () {

        var movies = FirebaseServiceMock.getMovies();
        expect(movies.length).toBe(2);
        expect(FirebaseServiceMock.getMovies).toHaveBeenCalled();

    });

    it('should be able to remove a movie', function () {
        var movie = {
            name: 'Men in black',
            director: 'Jason',
            year: 2000,
            description: 'Great movie'
        }
        scope.removeMovie(movie);
        expect(scope.movies.length).toBe(1);
        expect(FirebaseServiceMock.removeMovie).toHaveBeenCalled();

    });
});