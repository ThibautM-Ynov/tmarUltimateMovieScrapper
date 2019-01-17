import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { OmdbApiProvider } from '../providers/omdb-api/omdb-api';
import {DetailsPage} from "../pages/details/details";
import {EpisodesPage} from "../pages/episodes/episodes";
import {IonicStorageModule} from "@ionic/storage";
import { FavoriteProvider } from '../providers/favorite/favorite';
import {EpisodeDetailsPage} from "../pages/episode-details/episode-details";
import {File} from "@ionic-native/file";
import {FileChooser} from "@ionic-native/file-chooser";
import {FilePath} from "@ionic-native/file-path";
import {DocumentPicker} from "@ionic-native/document-picker";

@NgModule({
  declarations: [
    MyApp,
    DetailsPage,
    EpisodesPage,
    EpisodeDetailsPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DetailsPage,
    EpisodesPage,
    EpisodeDetailsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OmdbApiProvider,
    FavoriteProvider,
    File,
    FileChooser,
    FilePath,
    DocumentPicker,
  ]
})
export class AppModule {}
