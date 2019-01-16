import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {OmdbApiProvider} from "../../providers/omdb-api/omdb-api";
import {DetailsPage} from "../details/details";

/**
 * Generated class for the SeriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-series',
  templateUrl: 'series.html',
})
export class SeriesPage {
  private isOn: boolean = false;
  //searchPerformed: boolean = false;
  items: string[];
  series: any;
  searchType: string = '';
  searchText: string = '';
  pageIndex: number = 2;

  constructor(public navCtrl: NavController, public omdbApi: OmdbApiProvider) {
  }

  getState() {
    return this.isOn;
  }

  getItems(ev: any, type, nbPage) {
    this.searchText = ev.target.value;
    this.searchType = type;
    if (this.searchText && this.searchText.trim() != '') {
      this.omdbApi.getSearch(this.searchText, type, nbPage);
    }
    console.log(this.omdbApi.seriesResults);
    this.series = this.omdbApi.seriesResults
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.omdbApi.getSearch(this.searchText, this.searchType, this.pageIndex);

      infiniteScroll.complete();
    }, 500);
    this.series = this.omdbApi.seriesResults;
    console.log(this.series);
    this.pageIndex++;
  }

  goToDetail(serie) {
    this.navCtrl.push(DetailsPage, serie);
  }

}
