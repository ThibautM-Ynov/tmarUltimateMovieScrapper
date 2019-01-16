import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FavoriteProvider} from "../../providers/favorite/favorite";
import {DetailsPage} from "../details/details";
import {MoviesPage} from "../movies/movies";
import {SeriesPage} from "../series/series";
import {OmdbApiProvider} from "../../providers/omdb-api/omdb-api";

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

  favoriteItems = [];

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private favoriteProvider: FavoriteProvider,
      public omdbApi: OmdbApiProvider,
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad MyMoviesPage");
  }

  ionViewWillEnter() {
    this.initFavoriteItems();
  }

  private initFavoriteItems() {
    this.favoriteProvider
        .getFavoriteItems()
        .then(favs => (this.favoriteItems = favs));
  }

  findMovie() {
    this.navCtrl.push(MoviesPage);
  }

  findSerie() {
    this.navCtrl.push(SeriesPage);
  }

  goToDetail(item) {
    this.objectToArrayConverter(this.favoriteItems);
    this.navCtrl.push(DetailsPage, item)
  }

  objectToArrayConverter(items) {
    for (let item in items) {
      if (items[item].Type === 'series') {
        let seasons = items[item].Seasons;
        delete items[item].Seasons;
        let tmpSeasons = [];
        for (let season in seasons) {
          let tmpSeason = [];
          for (let item in seasons[season]) {
            tmpSeason[item] = seasons[season][item]
          }
          tmpSeasons.push(tmpSeason)
        }
        items[item]['Seasons'] = tmpSeasons;
      }
    }
  }

}
