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
  moviesIds = [];
  results = [];
  search = [];
  results_posters = [];
  url_base_data = "http://www.omdbapi.com/";
  url_base_poster = "http://img.omdbapi.com/";
  apiKey = "?apikey=75522b56";
  parameters = "&s=Guardians";
  title = "";

    constructor(public http: HttpClient) {
    }

    getData(url, parameters) {
      return this.http.get(url + this.apiKey + parameters).map((res) => res);
    }

    getMovies(search) {
      if (search != null) {
          while(this.results.length > 0) {
              this.results.pop();
          }
          this.getData(this.url_base_data, '&i=' + search).subscribe(data => {
              let tmp = [];
              for (let key in data) {
                  tmp[key] = data[key];
              }
              this.results.push(tmp);
          });
      }
      /*else {
          this.getData(this.url_base_data, this.parameters).subscribe(data => {
              for (let movie of data['Search']) {
                  this.results.push(movie);
                  this.moviesIds.push(movie.imdbID)
              }
          });
      }*/
    }

    getSearch(el, type) {
        this.title = el.trim().split(' ').join('+') + '*';
        this.search.length = 0;
        this.getData(this.url_base_data, '&s=' + this.title).subscribe(data => {
            if (data['Error'] === 'Too many results.') {
                return null;
            }
            if (data['Error'] === 'Movie not found!')  {
                return '';
            }
            for (let movie of data['Search']) {
                this.getMovies(movie['imdbID'])
                //this.search.push(movie.imdbID);
                //this.moviesIds.push(movie.imdbID)
            }
        });
    }

    // ???
/*    getDetails(ids) {
      for (let i=0;i<ids.length;i++){
        console.log(ids[i]);
        this.getData(this.url_base_poster, '&i=' + ids[i]).subscribe(data => {
          console.log('end')
          for (let poster of data['Search']) {
            this.results_posters.push(poster);
          }
        });
      }
    }*/

/*    getPoster(ids) {
        for (let i=0;i<ids.length;i++){
            console.log(ids[i]);
            console.log(this.http.get(this.url_base_poster + this.apiKey + '&i=' + ids[i]).map((res) => res).subscribe(data => {
                for (let movie of data['Search']) {
                    this.results.push(movie);
                    this.moviesIds.push(movie.imdbID)
                }
            }));
            /*this.getData(this.url_base_poster, '&i=' + ids[i]).subscribe(data => {
                console.log('end')
                for (let poster of data['Search']) {
                    this.results_posters.push(poster);
                }
            });
        }
    }*/
}
