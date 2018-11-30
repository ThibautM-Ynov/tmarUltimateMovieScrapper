import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";

/*
  Generated class for the OmdbApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OmdbApiProvider {
  results = [];
  url = "http://www.omdbapi.com/?s=Guardians&apikey=75522b56";

    constructor(public http: HttpClient) {
      this.getMovies()
    }

    getData() {
      return this.http.get(this.url).map((res) => res);
    }

    getMovies() {
      this.getData().subscribe(data => {
        for (let movie of data['Search']) {
          this.results.push(movie);
        }
      })
    }
}
