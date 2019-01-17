import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FavoriteProvider} from "../../providers/favorite/favorite";
import {EpisodesPage} from "../episodes/episodes";
import { File } from '@ionic-native/file';

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
      private file: File,
      private toastCtrl: ToastController,
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

  downloadImage(url) {
    //let file = this.file;
    //let toastCtrl = this.toastCtrl;
    //let oReq = new XMLHttpRequest();
//
    //oReq.open("GET", url, true);
    //oReq.responseType = "blob";
//
    //oReq.onload = function (oEvent) {
    //  file.writeFile(file.externalDataDirectory, 'tmp.jpg', oReq.response, { replace: true }).then( data => {
    //    (<any>window).cordova.plugins.imagesaver.saveImageToGallery(file.externalDataDirectory+'tmp.jpg', onSaveImageSuccess, onSaveImageError);
//
    //    function onSaveImageSuccess(){
    //      presentToast('File downloaded successfully !');
    //    }
    //    function onSaveImageError(error) {
    //      presentToast('Download failed...');
    //    }
//
    //    function presentToast(message) {
    //      let toast = toastCtrl.create({
    //        message: message,
    //        duration: 5000,
    //        position: 'bottom',
    //        showCloseButton: true
    //      });
    //      toast.present();
    //    }
    //  });
    //};
    //oReq.send();
  }
}
