import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {OmdbApiProvider} from "../../providers/omdb-api/omdb-api";
import {DetailsPage} from "../details/details";

/**
 * Generated class for the EpisodesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-episodes',
  templateUrl: 'episodes.html',
})
export class EpisodesPage {
  private episodes: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public omdbApi: OmdbApiProvider) {
  }

  ionViewDidLoad() {
    this.episodes = this.navParams.data; console.log(this.episodes)
  }

  getDetails(episode) {
    this.omdbApi.getEpisodeDetails(episode);
    //this.navCtrl.push(DetailsPage, serie);
  }

}
