import { Component } from '@angular/core';

import { Browser } from '../../providers/browser/browser';
import { FedoraMagazineService, Post } from '../../providers/fedora-magazine/fedora-magazine';
import { NotificationsPage } from '../../pages/notifications/notifications';
import { NavController, ActionSheetController, ToastController } from 'ionic-angular';

/**
 * Shows latest posts from Fedora Magazine
 */
@Component({
  templateUrl: 'magazine.html',
  providers: [FedoraMagazineService],
})
export class MagazinePage {

  /**
   * List of posts from Fedora Magazine
   */
  private posts: Post[];

  /**
   * Number of posts
   */
  postCount = 15;

  //Initialize array for showing calendar icon
  bookmarkIcon: string[] = [];

  //set icon values
  activeIcon: string = './assets/img/bookmark-active.svg';
  inactiveIcon: string = './assets/img/bookmark-inactive.svg';

  //currently Active Sort Parameter
  sortBy: string = 'latest';

  constructor(private browser: Browser,
    private fedoraMag: FedoraMagazineService, public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController) {
    for (let i = 0; i < 50; i++) {
      //update src of icon
      this.bookmarkIcon[i] = this.inactiveIcon;
    }
  }

  ngOnInit() {
    this.updatePosts(this.postCount);
  }

  /**
   * Fetch latest posts from Fedor Magazine API
   */
  updatePosts(postCount): void {
    this.fedoraMag.getPosts(postCount)
      .subscribe(posts => {
        this.posts = posts;
      });
  }

  /**
   * load more posts
   */
  loadMore(postCount): void {
    this.postCount += 5;
    this.updatePosts(this.postCount);
  }

  /**
   * Open a post in a browser
   *
   * Opens the post in an in-app browser in mobile app and in a new tab on desktop.
   *
   * @param post post to open
   */
  openPost(post: Post): void {
    this.browser.open(post.link);
  }

  /**
  * Create an action sheet to sort the articles
  */

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'SORT ARTICLES BY',
      buttons: [
        {
          /**
           * Sort the articles by date in descending order
           */
          text: 'Latest First',
          cssClass: this.sortBy === 'latest' ? 'active' : '',
          handler: () => {
            this.sortBy = 'latest';
            this.posts.sort(function (a: any, b: any): number {
              let firstDate = new Date(a.publishedAt);
              let secondDate = new Date(b.publishedAt);
              return secondDate.getTime() - firstDate.getTime();
            });
          }
        },
        {
          /**
           * Sort the articles by date in ascending order
           */
          text: 'Oldest First',
          cssClass: this.sortBy === 'oldest' ? 'active' : '',
          handler: () => {
            this.sortBy = 'oldest';
            this.posts.sort(function (a: any, b: any): number {
              let firstDate = new Date(a.publishedAt);
              let secondDate = new Date(b.publishedAt);
              return firstDate.getTime() - secondDate.getTime();
            });
          }
        },
        {
          /**
           * Sort the articles by number of comments in descending order
           */
          text: 'Comments',
          cssClass: this.sortBy === 'comments' ? 'active' : '',
          handler: () => {
            this.sortBy = 'comments';
            this.posts.sort(function (a: any, b: any): number {
              return b.comments - a.comments;
            });
          }
        },
      ]
    });
    /**
     * Load the action sheet
     */
    actionSheet.present();
  }


  /**
   * Open the notifications pane from the home page
   */
  openNotificationPage() {
    this.navCtrl.push(NotificationsPage, { animate: true, direction: 'forward' });
  }

  /**
 * Function called when someone taps the star to subscribe to the calendar
 */
  addToBookmark(post: Post, i: number): void {
    /**
     * Declare toasts for showing events
     */
    const subscribedToast = this.toastCtrl.create({
      message: 'Saved the article for offline reading',
      duration: 2000
    });
    const unsubscribedToast = this.toastCtrl.create({
      message: 'Removed the article from bookmarks',
      duration: 2000
    });

    /**
     * Fire event on the basis of selected icon
     */
    if (this.bookmarkIcon[i] === this.inactiveIcon) {
      this.bookmarkIcon[i] = this.activeIcon;
      subscribedToast.present();
    } else {
      this.bookmarkIcon[i] = this.inactiveIcon;
      unsubscribedToast.present();
    }
  }
}
