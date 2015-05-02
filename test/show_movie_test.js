describe('Show movie', function () {
    var controller, scope;

    var FirebaseServiceMock, RouteParamsMock;

    beforeEach(function () {
        // Lisää moduulisi nimi tähän
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
                }
            }
        })();

        RouteParamsMock = (function () {
            return {
                // Toteuta mockattu $routeParams-muuttuja tähän
            }
        });

        // Lisää vakoilijat
        // spyOn(FirebaseServiceMock, 'jokuFunktio').and.callThrough();

        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Muista vaihtaa oikea kontrollerin nimi!
            controller = $controller('ShowMovieController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock,
                $routePrams: RouteParamsMock
            });
        });
    });

    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */

    /* 
     * Testaa, että Firebasesta (mockilta) saatu elokuva löytyy kontrollerista.
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota
     * käyttämällä toBeCalled-oletusta.
     */
    it('should show current movie from Firebase', function () {
        expect(true).toBe(true);
    });
});