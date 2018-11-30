import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    movies: any;

    constructor(public navCtrl: NavController, public omdbApi: OmdbApiProvider) {
        this.movies = this.omdbApi.results;
        console.log(this.movies);
    }

}
