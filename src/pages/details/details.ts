import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FavoriteProvider} from "../../providers/favorite/favorite";
import {EpisodesPage} from "../episodes/episodes";
//import {PhotoLibrary} from "@ionic-native/photo-library";

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
      //private toastCtrl: ToastController,
      //private photoLibrary: PhotoLibrary,
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

  getSeasonEpisodes(episodes) {
    this.navCtrl.push(EpisodesPage, episodes);
  }

  public downloadImage(posterUrl) {
    //this.photoLibrary.requestAuthorization({read:true,write:true}).then(() => {
//
    //  this.photoLibrary.saveImage((posterUrl + "&ext=.jpg"), 'UltimateMovieScrapper').then( response => {
    //    let toast = null;
    //    if(response.creationDate) {
    //      toast = this.toastCtrl.create({
    //        message: `The poster has been downloaded in the UltimateMovieScrapper album.`,
    //        duration: 3000
    //      });
    //    } else {
    //      toast = this.toastCtrl.create({
    //        message: `The poster could not be downloaded.`,
    //        duration: 3000
    //      });
    //    }
//
    //    toast.present();
    //  }).catch((err) => console.log(err));
//
    //}).catch(err => console.log('permissions weren\'t grandted'));
  }

}
