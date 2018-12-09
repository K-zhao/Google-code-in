import { Injectable } from '@angular/core';
import { Toast } from '@ionic-native/toast';
import { Platform } from 'ionic-angular';

declare var cordova:any;

/**
 * Wrapper over in-app browser to show a busy indicator while loading web content
 */
@Injectable()
export class Browser {

  constructor(private platform: Platform, private toast: Toast) {
  }

  private errorCallback = (err) => this.toast.showShortBottom('Could not open browser');

  private openFallback(link:string): void {
    window.open(encodeURI(link), '_blank');
  }

  /**
   * Open a link in an in-app browser
   *
   * @param link link to open in a an in-app browser
   */
  public open(link:string): void {
    // Desktop, iOS and Ionic DevApp
    if (!this.platform.is('android') || !cordova.CustomBrowser) {
      this.openFallback(link);
      return;
    }

    const options = {
      toolbarColor: '#294172',
      secondaryToolbarColor: '#ffffff',
      showShareMenuItem: true
    };

    cordova.CustomBrowser.available((result) => {
      if (result) {
        cordova.CustomBrowser.open(link, options, () => { }, this.errorCallback);
      } else {
        this.openFallback(link);
      }
    }, this.errorCallback);
  }
}

