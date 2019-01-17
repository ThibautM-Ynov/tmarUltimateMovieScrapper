import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {OmdbApiProvider} from "../../providers/omdb-api/omdb-api";
import {DetailsPage} from "../details/details";

/**
 * Generated class for the MoviesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html',
})
export class MoviesPage {
  private isOn: boolean = false;
  //searchPerformed: boolean = false;
  items: string[];
  movies: any;
  searchType: string = '';
  searchText: string = '';
  pageIndex: number = 2;

  constructor(public navCtrl: NavController, public omdbApi: OmdbApiProvider) {
  }

  getState() {
    return this.isOn;
  }

  getItems(ev: any, type, nbPage) {
    this.searchText = ev.target.value;
    this.searchType = type;
    if (this.searchText && this.searchText.trim() != '') {
      this.omdbApi.getSearch(this.searchText, type, nbPage);
    }

    this.movies = this.omdbApi.moviesResults;
    console.log(this.movies);
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.omdbApi.getSearch(this.searchText, this.searchType, this.pageIndex);

      infiniteScroll.complete();
    }, 500);
    this.movies = this.omdbApi.moviesResults;
    console.log(this.movies);
    this.pageIndex++;
  }

  goToDetail(movie) {console.log(movie)
    this.navCtrl.push(DetailsPage, movie);
  }

}
