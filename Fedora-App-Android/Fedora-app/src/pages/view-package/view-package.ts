import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Package } from 'providers/package-search/package-search';
import { getPackageType } from '../../utils';

/**
 * Generated class for the ViewPackagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-view-package',
  templateUrl: 'view-package.html',
})
export class ViewPackagePage {

  pkg: Package;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pkg = this.navParams.get('pkg') || {};
  }

  showPackage(pkg: Package) {
    this.navCtrl.push(ViewPackagePage, { pkg });
  }

  getPackageType(pkg:Package) {
    return getPackageType(pkg.name);
  }
}
