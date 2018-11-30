import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the TabsFooterPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs-footer',
  templateUrl: 'tabs-footer.html'
})
export class TabsFooterPage {

  moviesRoot = 'MoviesPage'
  seriesRoot = 'SeriesPage'
  favsRoot = 'FavsPage'
  accountRoot = 'AccountPage'


  constructor(public navCtrl: NavController) {}

}
