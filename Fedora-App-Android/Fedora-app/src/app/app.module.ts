import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { Toast } from '@ionic-native/toast';

import { App } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { MagazinePage } from '../pages/magazine/magazine';
import { AskPage } from '../pages/ask/ask';
import { MorePage, AboutDetailPage, AboutPage, BookmarksPage, WomenDiversity, FedoraPodcast, PodcastPlayer } from '../pages/more/more';
import { CalendarPage, Search, meetingDetails } from '../pages/calendar/calendar';
import { NotificationsPage } from '../pages/notifications/notifications';
import { PackageSearchPage } from '../pages/package-search/package-search';
import { ViewPackagePage } from '../pages/view-package/view-package';

import { NoBookmarksComponent } from '../components/no-bookmarks/no-bookmarks';
import { NoMeetingsComponent } from '../components/no-meetings/no-meetings';
import { NoResultsComponent } from '../components/no-results/no-results';
import { NoInternetComponent } from '../components/no-internet/no-internet';

import { Browser } from '../providers/browser/browser';

@NgModule({
  declarations: [
    App,
    TabsPage,
    HomePage,
    MagazinePage,
    AskPage,
    CalendarPage,
    MorePage,
    NotificationsPage,
    AboutDetailPage,
    AboutPage,
    BookmarksPage,
    PackageSearchPage,
    ViewPackagePage,
    Search,
    meetingDetails,
    WomenDiversity,
    NoBookmarksComponent,
    NoMeetingsComponent,
    NoResultsComponent,
    NoInternetComponent,
    FedoraPodcast,
    PodcastPlayer
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(App),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
    MagazinePage,
    AskPage,
    CalendarPage,
    TabsPage,
    HomePage,
    MorePage,
    NotificationsPage,
    AboutDetailPage,
    BookmarksPage,
    AboutPage,
    PackageSearchPage,
    ViewPackagePage,
    Search,
    meetingDetails,
    WomenDiversity,
    FedoraPodcast,
    PodcastPlayer
  ],
  providers: [
    Browser,
    SocialSharing,
    SplashScreen,
    SpinnerDialog,
    StatusBar,
    Toast,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
