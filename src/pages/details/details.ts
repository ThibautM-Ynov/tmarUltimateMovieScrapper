import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
      public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    this.movie = this.navParams.data;
  }

  toggleFavorite() {
    if (this.isFavorite) {
      this.isFavorite = false;
      // TODO persist data
    } else {
      this.isFavorite = true;
      // TODO persist data
    }
  }
}
