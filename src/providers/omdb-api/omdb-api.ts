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
  moviesResults = [];
  seriesResults = [];
  search = [];
  url_base_data = "http://www.omdbapi.com/";
  url_base_poster = "http://img.omdbapi.com/";
  apiKey = "?apikey=75522b56";
  title = "";

    constructor(public http: HttpClient) {
    }

    callApi(url, parameters) {
      return this.http.get(url + this.apiKey + parameters).map((res) => res);
    }

    getNextPage(search, type) {
        if (type === 'movie') {
            this.callApi(this.url_base_data, '&i=' + search).subscribe(data => {
                let tmp = [];
                for (let key in data) {
                    tmp[key] = data[key];
                }
                this.moviesResults.push(tmp);
            });
        }
        if (type === 'series') {
            this.callApi(this.url_base_data, '&i=' + search).subscribe(data => {
                let tmp = [];
                for (let key in data) {
                    tmp[key] = data[key];
                }
                this.seriesResults.push(tmp);
            });
        }
    }

    getData(search, type) {
      if (search != null) {
          if (type === 'movie') {
              while(this.moviesResults.length > 0) {
                  this.moviesResults.pop();
              }
              this.callApi(this.url_base_data, '&i=' + search).subscribe(data => {
                  let tmp = [];
                  for (let key in data) {
                      tmp[key] = data[key];
                  }
                  tmp['PosterHD'] = this.url_base_poster + this.apiKey + '&i=' + search;
                  tmp['LongPlot'] = '';
                  this.callApi(this.url_base_data, '&i=' + search + '&plot=full').subscribe(data => {
                      for (let key in data) {
                          if (key == 'Plot') {
                              tmp['LongPlot'] = data[key];
                          }
                      }
                  });
                  this.moviesResults.push(tmp);
              });
          }
          if (type === 'series') {
              while(this.seriesResults.length > 0) {
                  this.seriesResults.pop();
              }
              this.callApi(this.url_base_data, '&i=' + search).subscribe(data => {
                  let tmp = [];
                  for (let key in data) {
                      tmp[key] = data[key];
                  }
                  tmp['PosterHD'] = this.url_base_poster + this.apiKey + '&i=' + search;
                  tmp['Seasons'] = [];
                  for (let i = 1; i <= tmp['totalSeasons']; i++) {
                      this.callApi(this.url_base_data, '&i=' + search + '&Season=' + i).subscribe(data => {
                          let tmpSeason = [];
                          for (let key in data) {
                              tmpSeason[key] = data[key];
                          }
                          tmp['Seasons'].push(tmpSeason);
                      });
                  }
                  tmp['LongPlot'] = '';
                  this.callApi(this.url_base_data, '&i=' + search + '&plot=full').subscribe(data => {
                      for (let key in data) {
                          if (key == 'Plot') {
                              tmp['LongPlot'] = data[key];
                          }
                      }
                  });
                  this.seriesResults.push(tmp);
              });
          }
      }
    }

    getSearch(el, type, nbPage) {
        this.title = el.trim().split(' ').join('+') + '*';
        this.search.length = 0;
        this.callApi(this.url_base_data, '&s=' + this.title + '&type=' + type + '&page=' + nbPage).subscribe(data => {
            if (data['Error'] === 'Too many results.') {
                return null;
            }
            if (data['Error'] === 'Movie not found!')  {
                return '';
            }
            if (data['Error'] === 'Series not found!')  {
                return '';
            }
            for (let elem of data['Search']) {
                if (nbPage > 1) {
                    this.getNextPage(elem['imdbID'], type)
                } else {
                    this.getData(elem['imdbID'], type)
                }
            }
        });
    }

    //getEpisodeDetails(id): Promise<string[]> {
    //    return new Promise(resolve => {
    //        let episode = []
                //        this.callApi(this.url_base_data, '&i=' + id).subscribe(data => {
    //            let tmp = [];
    //            for (let key in data) {
    //                tmp[key] = data[key];
    //            }
    //            episode = tmp;
    //            console.log(episode)
                        //        });
    //        console.log(episode)
                //        return resolve(episode);
    //    });
    //}
}
