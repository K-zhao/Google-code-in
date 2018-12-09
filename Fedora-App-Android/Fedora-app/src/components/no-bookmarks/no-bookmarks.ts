import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

@Component({
  selector: 'no-bookmarks',
  templateUrl: 'no-bookmarks.html'
})

export class NoBookmarksComponent {

  constructor(public navCtrl: NavController) {
  }

  /**
   * Switches to Mag View to read articles
   */
  toMag() {
    this.navCtrl.parent.select(1);
  }

}
