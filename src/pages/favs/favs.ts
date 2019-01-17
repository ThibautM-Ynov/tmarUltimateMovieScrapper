import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FavoriteProvider} from "../../providers/favorite/favorite";
import {DetailsPage} from "../details/details";
import {MoviesPage} from "../movies/movies";
import {SeriesPage} from "../series/series";
import {OmdbApiProvider} from "../../providers/omdb-api/omdb-api";
import {EpisodeDetailsPage} from "../episode-details/episode-details";
import { Storage } from "@ionic/storage";
import { File } from '@ionic-native/file';
import {FilePath} from "@ionic-native/file-path";
import {FileChooser} from "@ionic-native/file-chooser";
import {DocumentPicker} from "@ionic-native/document-picker";

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
      public alertCtrl: AlertController,
      public storage: Storage,
      private file: File,
      private filePath: FilePath,
      private fileChooser: FileChooser,
      private toastCtrl: ToastController,
      private docPicker: DocumentPicker,
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
    if (item.Episode && (typeof item.Episode) == "string") {
      this.navCtrl.push(EpisodeDetailsPage, item)
    }
    else {
      this.navCtrl.push(DetailsPage, item)
    }
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

  exportFavorites() {
    let alert = this.alertCtrl.create({
      title: 'Are you sure ?',
      message: 'You will export this favorite list in a JSON file in your root directory.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Continue',
          handler: () => {
            this.exportFavs();
          }
        }
      ]
    });
    alert.present();
  }

  exportFavs() {
    let content: any = {};
    this.storage.forEach((value, key) => {
      content[key] = value;
    });
    this.writeJSON('favs.json', content);
  }

  importFavs() {
    this.fileChooser.open().then(uri => {
      this.getJSON(uri);
    }).catch(_ => {
      console.log('error');
    });
  }

  writeJSON(filename, object) {
    return this.file.writeFile(this.file.documentsDirectory, filename, object, {replace:true}).then(_ => {
      this.presentToast('JSON file downloaded in your root directory !');
      console.log('Directory exists: ' + this.file.documentsDirectory);
    }).catch(_ => {
      console.log('Directory doesn\'t exist');
    });
  }

  getJSON(uri) {
    this.filePath.resolveNativePath(uri).then(path => {
      let splitedPath = path.split('/');
      let fileName = splitedPath.pop();
      let fullPath = splitedPath.join('/');
      this.file.readAsText(fullPath, fileName).then(data => {
        this.createFromList(data);
      });
    });
  }
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: 'bottom',
      showCloseButton: true
    });
    toast.present();
  }

  createFromList(data) {
    this.storage.clear();
    let list = JSON.parse(data);
    for (let key in list) {
      this.storage.set(key, list[key]);
    }
    this.presentToast('List imported. Reload the app or switch page to see the new list !');
  }

  importFavorites() {
    let alert = this.alertCtrl.create({
      title: 'Warning !',
      message: 'By importing a file, you\'ll overwrite your favorites. Be sure before selecting a (JSON) file !',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Continue',
          handler: () => {
            this.docPicker.getFile('all')
                .then(uri => {
                  this.getJSON(uri);
                }).catch(_ => {
              console.log('error');
            });
            this.importFavs();
          }
        }
      ]
    });
    alert.present();
  }


}
