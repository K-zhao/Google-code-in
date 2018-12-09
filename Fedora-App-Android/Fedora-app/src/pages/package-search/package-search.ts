import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PackageSearchProvider, Package } from '../../providers/package-search/package-search';
import { ViewPackagePage } from '../view-package/view-package';
import { getPackageType } from '../../utils';

const RESULTS_PER_PAGE = 10;

@Component({
  templateUrl: 'package-search.html',
  providers: [PackageSearchProvider]
})
export class PackageSearchPage {

  searchQuery: string;
  offset = 0;
  matches = 0;
  packages: Package[] = [];
  showError: boolean;

  constructor(public navCtrl: NavController, private searchProvider: PackageSearchProvider) {
    this.showError = false;
  }

  search() {
    this.searchProvider.search(this.searchQuery, RESULTS_PER_PAGE, this.offset)
      .subscribe(r => {
        this.packages = r.packages;
        this.offset = r.offset;
        this.matches = r.matches;
        //if no matches returned show error
        if (this.packages.length === 0) {
          this.showError = true;
        }
      });
  }

  clear() {
    this.packages = [];
    this.offset = 0;
    this.matches = 0;
  }

  showPackage(pkg: Package) {
    this.navCtrl.push(ViewPackagePage, { pkg });
  }

  getPackageType(pkg: Package) {
    return getPackageType(pkg.name);
  }
}
