import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FavoriteProvider} from "../../providers/favorite/favorite";
import {OmdbApiProvider} from "../../providers/omdb-api/omdb-api";

/**
 * Generated class for the EpisodeDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-episode-details',
  templateUrl: 'episode-details.html',
})
export class EpisodeDetailsPage {
  private item: any;
  isFavorite: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private favoriteProvider: FavoriteProvider,
              public omdbApi: OmdbApiProvider,
              )
  {}

  ionViewWillEnter() {
    this.item = this.navParams.data;
    console.log(this.item);
    this.favoriteProvider
        .isFavoriteItem(this.item)
        .then(value => (this.isFavorite = value));
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    this.favoriteProvider.toogleFavoriteItem(this.item);
  }

}
