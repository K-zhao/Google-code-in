import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { NotificationsPage } from '../../pages/notifications/notifications'
import { Browser } from '../../providers/browser/browser';
import { FacebookProvider } from '../../providers/social/facebook';
import { TwitterProvider } from '../../providers/social/twitter';
import { SocialMediaPost } from '../../providers/social/social';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { FedoraMagazineService, Post, Image } from '../../providers/fedora-magazine/fedora-magazine';
import { CommunityBlogService } from '../../providers/community-blog/community-blog';

const HANDLE = Object.seal({
  FB: 'TheFedoraProject',
  TWITTER: 'fedora',
});

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [FacebookProvider, TwitterProvider, FedoraMagazineService, CommunityBlogService]
})

export class HomePage {
  /**
   * Set the currently active segment on Home Page as Community Blog
   */
  latestActive: String = "blog";

  /**
   * List of Facebook and Twitter Posts
   */
  socialposts: SocialMediaPost[];

  /**
   * List of images fetched from FedoraMag showing top 5 latest events
   */
  carousel: Image[];

  /**
   * List of posts from Fedora Community Blog
   */
  blogposts: Post[];

  constructor(public navCtrl: NavController, private browser: Browser,
              private fb: FacebookProvider,
              private twitter: TwitterProvider,
              private fedoraMag: FedoraMagazineService,
              private communityblog: CommunityBlogService,
              private toast: ToastController) {
    this.socialposts = [];
    this.blogposts = [];
    this.carousel = [];
  }

  /**
   * Fetch posts from social media channels
   *
   * Currently, we fetch posts from Facebook and Twitter
   */
  private updateSocialMedia(): void {
    combineLatest(this.fb.getPosts(HANDLE.FB), this.twitter.getPosts(HANDLE.TWITTER))
      .subscribe(values => {
        this.socialposts = [...values[0], ...values[1]] as SocialMediaPost[];
      }, () => this.toast.create({
          message: 'Could not load feed',
          position: 'bottom',
          duration: 2000,
        }).present()
      );
  }

  /**
   * Fetch Latest 5 Images from 'Latest from Fedora Section' of Magazine for carousel
   */
  private updateImages(): void {
    this.fedoraMag.getImages()
      .subscribe(images => {
        this.carousel = images;
      }, () => this.toast.create({
        message: 'Could not update header',
        position: 'bottom',
        duration: 2000,
      }).present()
    );
  }

  /**
   * Fetch Blog Posts from the Fedora Community Blog
   */
  private updateBlogPosts(): void {
    this.communityblog.getBlogPosts('null')
      .subscribe(blogposts => {
        this.blogposts = blogposts;
      }, () => this.toast.create({
        message: 'Could not load blog posts',
        position: 'bottom',
        duration: 2000,
      }).present()
    );
  }

  ngOnInit() {
    this.updateImages();
    this.updateBlogPosts();
    this.updateSocialMedia();
  }

  /**
   * Opens a update in a browser
   *
   * Opens the update in an in-app browser in mobile app and in a new tab on desktop.
   *
   * @param update update to open
   */
  openUpdate(update: any): void {
    this.browser.open(update.link);
  }

  /**
   * Open the notifications pane from the home page
   */
  openNotificationPage() {
    this.navCtrl.push(NotificationsPage, { animate: true, direction: 'forward' });
  }

}
