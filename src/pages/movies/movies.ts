import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {OmdbApiProvider} from "../../providers/omdb-api/omdb-api";

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

  constructor(public navCtrl: NavController, public omdbApi: OmdbApiProvider) {
  }

  getState() {
    return this.isOn;
  }

  getItems(ev: any, type) {
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.omdbApi.getSearch(ev.target.value, type);
    }
    console.log(this.omdbApi.results)
    this.movies = this.omdbApi.results
  }

}
