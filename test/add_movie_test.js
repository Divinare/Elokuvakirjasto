/* the tests can be run with:
 *  node ./node_modules/karma/bin/karma start */

describe('Add movie', function () {
    var controller, scope;
    var FirebaseServiceMock;
    beforeEach(function () {
        // Lisää moduulisi nimi tähän
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

                movies: movies,
                addMovie: function () {
                    if (scope.name === '' || scope.director === '' || scope.year === '' || scope.description === '')
                        return
                    movies.push({
                        name: scope.name,
                        director: scope.director,
                        year: scope.year,
                        description: scope.description
                    })
                }
            }
        })();
        spyOn(FirebaseServiceMock, 'addMovie').and.callThrough();

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();

            controller = $controller('AddMovieController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock
            });
        });
    });

    it('should be able to add a movie by its name, director, release date and description', function () {

        expect(FirebaseServiceMock.movies.length).toBe(2);
        expect(FirebaseServiceMock.movies[1].name).toBe('LOTR');


        scope.name = 'new movie';
        scope.director = 'someone';
        scope.year = '2008';
        scope.description = 'asd'

        scope.addMovie();
        expect(FirebaseServiceMock.addMovie).toHaveBeenCalled();
        expect(FirebaseServiceMock.movies.length).toBe(3);
        expect(FirebaseServiceMock.movies[2].name).toBe('new movie');
    });

    it('should not be able to add a movie if its name, director, release date or description is empty', function () {
        scope.name = '';
        scope.director = 'someone';
        scope.year = '2008';
        scope.description = 'asd'

        scope.addMovie();
        expect(FirebaseServiceMock.movies.length).toBe(2);


        scope.name = 'new movie';
        scope.director = '';
        scope.year = '2008';
        scope.description = 'asd'

        scope.addMovie();
        expect(FirebaseServiceMock.movies.length).toBe(2);

        scope.name = 'new movie';
        scope.director = 'someone';
        scope.year = '';
        scope.description = 'asd'

        scope.addMovie();
        expect(FirebaseServiceMock.movies.length).toBe(2);

        scope.name = 'new movie';
        scope.director = 'someone';
        scope.year = '2008';
        scope.description = ''

        scope.addMovie();
        expect(FirebaseServiceMock.movies.length).toBe(2);

    });
});