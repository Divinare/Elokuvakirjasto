MovieLibrary.service('FirebaseService', function ($firebase) {
    var firebaseRef = new Firebase('https://sweltering-heat-7612.firebaseio.com/movies');
    var sync = $firebase(firebaseRef);
    var movies = sync.$asArray();

    this.getMovies = function () {
        return movies;
    }

    this.getMovie = function (key, done) {
        movies.$loaded(function () {
            done(movies.$getRecord(key));
        });
    }

    this.addMovie = function (movie) {
        movies.$add(movie);
    }

    this.editMovie = function (movie) {
        console.log("Saved. " + movie.name);
        movies.$save(movie);
    }

    this.removeMovie = function (movie) {
        movies.$remove(movie);
    }

});