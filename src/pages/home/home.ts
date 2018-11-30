import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OmdbApiProvider } from "../../providers/omdb-api/omdb-api";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  movies: any;

  constructor(public navCtrl: NavController, public omdbApi: OmdbApiProvider) {
    this.movies = this.omdbApi.results;
    console.log(this.movies);
  }

}
