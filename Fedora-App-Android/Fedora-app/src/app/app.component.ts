import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';
import { SplashScreen } from '@ionic-native/splash-screen';

/**
 * Entrypoint for the Fedora App
 */
@Component({
  templateUrl: 'app.html',
})
export class App {
  //set the entry point of app as Tabs
  rootPage:any = TabsPage;

  @ViewChild('content') nav: NavController;

  constructor(platform: Platform, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      splashScreen.hide();
    });
  }
}
