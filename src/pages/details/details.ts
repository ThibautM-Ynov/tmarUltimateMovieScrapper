import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FavoriteProvider} from "../../providers/favorite/favorite";
import {EpisodesPage} from "../episodes/episodes";

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

  item;
  isFavorite: boolean = false;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private favoriteProvider: FavoriteProvider,
  ) {}

  ionViewWillEnter() {
    this.item = this.navParams.data;
    console.log(this.item)
    this.favoriteProvider
        .isFavoriteItem(this.item)
        .then(value => (this.isFavorite = value));
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    this.favoriteProvider.toogleFavoriteItem(this.item);
  }

  getSeasonEpisodes(episodes) {console.log(episodes)
    this.navCtrl.push(EpisodesPage, episodes);
  }
}
