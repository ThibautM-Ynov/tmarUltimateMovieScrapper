import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FavoriteProvider} from "../../providers/favorite/favorite";
import {DetailsPage} from "../details/details";
import {MoviesPage} from "../movies/movies";

/**
 * Generated class for the FavsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favs',
  templateUrl: 'favs.html',
})
export class FavsPage {

  favoriteMovies = [];

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private favoriteProvider: FavoriteProvider,
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad MyMoviesPage");
  }

  ionViewWillEnter() {
    this.initFavoriteMovies();
  }

  private initFavoriteMovies() {
    this.favoriteProvider
        .getFavoriteMovies()
        .then(favs => (this.favoriteMovies = favs));
  }

  findMovie() {
    this.navCtrl.push(MoviesPage);
  }

  goToDetail(movie) {
    this.navCtrl.push(DetailsPage, movie);
  }

}
