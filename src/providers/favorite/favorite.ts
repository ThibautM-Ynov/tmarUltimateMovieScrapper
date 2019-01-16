import { Injectable } from '@angular/core';
import {Storage} from "@ionic/storage";

/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const ITEM_KEY = "item_";

@Injectable()
export class FavoriteProvider {

  constructor(private storage: Storage) {
    console.log('Hello FavoriteProvider Provider');
  }

  addFavoriteItem(item: any) {
    console.log('added.');
    console.log(item);
    //  let seasons = item.Seasons;
    //delete item.Seasons;
    //
    //let tmpSeason: object = {};
    //for (let season in seasons) {
    //  let episodes = seasons[season]['Episodes'];
    //  delete seasons[season]['Episodes'];
    //
    //  let tmpEpisodes: object = {};
    //  for (let episode in episodes) {
    //    tmpEpisodes[episode] = episodes[episode];
    //  }
    //  tmpSeason[season] = seasons[season];
    //  //seasons[season] = { 'Episodes': tmpEpisodes};
    //  tmpSeason[season]['Episodes'] = tmpEpisodes;
    //}


    let tmp: object = {};
    for (let key in item) {
      if (key !== "Seasons") {
        tmp[key] = item[key];
      }
      else {
        tmp['Seasons'] = {};
        for (let season in item[key]) {
          tmp['Seasons'][season] = {...tmp['Seasons'][season], ...item[key][season]}
        }
      }
    }
    //tmp['Seasons'] = {};
    //tmp['Seasons'] = tmpSeason;

    console.log(tmp);
    console.log(JSON.stringify(tmp));
    console.log(JSON.stringify(tmp.Seasons));
    this.storage.set(this.getItemKey(item), JSON.stringify(tmp));
  }

  removeFavoriteItem(item) {
    console.log('removed.');
    this.storage.remove(this.getItemKey(item));
  }

  isFavoriteItem(item) {
    return this.storage.get(this.getItemKey(item));
  }

  toogleFavoriteItem(item) {
    this.isFavoriteItem(item).then(
        isFavorite =>
            isFavorite
                ? this.removeFavoriteItem(item)
                : this.addFavoriteItem(item)
    );
  }

  getItemKey(item) {
    return ITEM_KEY + item.imdbID.toString();
  }

  getFavoriteItems(): Promise<string[]> {
    return new Promise(resolve => {
      let results = [];
      this.storage
          .keys()
          .then(keys =>
              keys
                  .filter(key => key.includes(ITEM_KEY))
                  .forEach(key =>
                      this.storage.get(key).then(data => results.push(JSON.parse(data)))
                  )
          );
      return resolve(results);
    });
  }

}
