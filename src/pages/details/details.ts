import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FavoriteProvider} from "../../providers/favorite/favorite";

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  movie;
  isFavorite: boolean = false;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private favoriteProvider: FavoriteProvider,
  ) {}

  ionViewDidLoad() {
    this.movie = this.navParams.data;
    this.favoriteProvider
        .isFavoriteMovie(this.movie)
        .then(value => (this.isFavorite = value));
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    this.favoriteProvider.toogleFavoriteMovie(this.movie);
  }
}
