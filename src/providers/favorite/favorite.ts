import { Injectable } from '@angular/core';
import {Storage} from "@ionic/storage";

/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const MOVIE_KEY = "movie_";

@Injectable()
export class FavoriteProvider {

  constructor(private storage: Storage) {
    console.log('Hello FavoriteProvider Provider');
  }

  addFavoriteMovie(movie: any) {
    console.log('added.');
    console.log(typeof movie);
    console.log(movie);
    let tmp = {};
    for (let key in movie) {
      tmp[key] = movie[key];
    }

    this.storage.set(this.getMovieKey(movie), JSON.stringify(tmp));
  }

  removeFavoriteMovie(movie) {
    console.log('removed.');
    this.storage.remove(this.getMovieKey(movie));
  }

  isFavoriteMovie(movie) {
    console.log(this.storage.get(this.getMovieKey(movie)));
    return this.storage.get(this.getMovieKey(movie));
  }

  toogleFavoriteMovie(movie) {
    this.isFavoriteMovie(movie).then(
        isFavorite =>
            isFavorite
                ? this.removeFavoriteMovie(movie)
                : this.addFavoriteMovie(movie)
    );
  }

  getMovieKey(movie) {
    return MOVIE_KEY + movie.imdbID.toString();
  }

  getFavoriteMovies(): Promise<string[]> {
    return new Promise(resolve => {
      let results = [];
      this.storage
          .keys()
          .then(keys =>
              keys
                  .filter(key => key.includes(MOVIE_KEY))
                  .forEach(key =>
                      this.storage.get(key).then(data => results.push(JSON.parse(data)))
                  )
          );
      return resolve(results);
    });
  }

}
