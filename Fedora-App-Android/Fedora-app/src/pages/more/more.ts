import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotificationsPage } from '../../pages/notifications/notifications';
import { PackageSearchPage } from '../package-search/package-search';
import { Browser } from '../../providers/browser/browser';
import { Post } from '../../providers/fedora-magazine/fedora-magazine';
import { CommunityBlogService } from '../../providers/community-blog/community-blog';
import { PodcastService, Podcast } from '../../providers/fedora-podcast/podcast';

@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {

  /**
   * For demo purposes
   */
  private loggedIn: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.loggedIn = false;
  }

  /**
   * Open page to the corresponding menu item
   * @param page page name clicked
   */
  itemSelected(page) {
    switch (page) {
      case 'bookmarks':
        this.navCtrl.push(BookmarksPage, { animate: true, direction: 'forward' });
        break;
      case 'about':
        this.navCtrl.push(AboutPage, { animate: true, direction: 'forward' });
        break;
      case 'package':
        this.navCtrl.push(PackageSearchPage, { animate: true, direction: 'forward' });
        break;
      case 'podcast':
        this.navCtrl.push(FedoraPodcast, { animate: true, direction: 'forward' });
        break;
    }
  }


  /**
   * Open the notifications pane from the home page
   */
  openNotificationPage() {
    this.navCtrl.push(NotificationsPage, { animate: true, direction: 'forward' });
  }
}

/**
 * About Page Component
 */

@Component({
  selector: 'about-us',
  templateUrl: 'about.html',
})
export class AboutPage {

  /**
   * List of Items to show in about us list
   */
  public navItems = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.navItems = [
      {
        'title': 'What is Fedora?',
        'description': 'The Fedora Project is a community of people working together to build a free and open source software platform and to collaborate on and share user-focused solutions built on that platform. Or, in plain English, we make an operating system and we make it easy for you do useful stuff with it. <br/> <br/> The Fedora community includes thousands of individuals with different views and approaches, but together we share some common values. We call these the “Four Foundations”: Freedom, Friends, Features, and First.'
      },
      {
        'title': 'Our Mission',
        'description': 'Fedora creates an innovative platform for hardware, clouds, and containers that enables software developers and community members to build tailored solutions for their users.<br/><br/>At the operating system level, we don’t just integrate. We do new things — we build a platform, not just a distribution. The Features and First foundations drive us to innovate. We do all of this as a transparent, collaborative community of Friends, and entirely as open source and free software — Freedom.'
      },
      {
        'title': 'Our Method',
        'description': 'The Fedora Project is a center for innovation in free and open source software. In our community,contributors of all kinds come together to advance the ecosystem for the benefit of everyone. The Fedora community contributes everything it builds back to the free and open source world and continues to make advances of significance to the broader community, as evidenced by the regular and rapid incorporation of its features into other Linux distributions. Regardless of which Linux distribution you use, you are relying on code developed within the Fedora Project.<br/><br/>We believe software patents are harmful, a hindrance to innovation in software development, and are inconsistent with the values of free and open source software. While tightly integrating proprietary and patent encumbered components might superficially improve ease of use, this practice does not benefit the community in the long run. The Fedora community prefers approaches that benefit the progress of free software in the future over those that emphasize short term ease of use.'
      },
      {
        'title': 'Women and Diversity',
        'description': ''
      },
      {
        'title': 'Contribute to Fedora App',
        'description': 'Fedora App is the central location for Fedora users and innovators to stay updated on The Fedora Project. News updates, social posts, Ask Fedora, as well as articles from Fedora Magazine are all held under this app. <br/> <br/> Contribute to app development : <a href="https://pagure.io/Fedora-app/">https://pagure.io/Fedora-app/</a>'
      }
    ]
  }

  /**Open detailed info of selected item
   * @param navItem clicked item of about Fedora
   */
  openAboutDetailPage(item) {
    //open details if not women page, else push the women page
    item.title === 'Women and Diversity' ? this.navCtrl.push(WomenDiversity) : this.navCtrl.push(AboutDetailPage, { item: item });
  }
}

/**
 * About Detailed Component
 */
@Component({
  selector: 'about-detail',
  templateUrl: 'about-detail.html',
})
export class AboutDetailPage {
  /**
   * Individual About Item receieved
   */
  public selectedItem;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedItem = navParams.data.item;
  }
}

/**
 * Bookmarks Page Component
 */

@Component({
  selector: 'bookmarks',
  templateUrl: 'bookmarks.html',
})
export class BookmarksPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  /**
   * Switches to Mag View to read articles
   */
  toMag() {
    this.navCtrl.parent.select(1);
  }
}

/** Women and Diversity Page Component */

@Component({
  selector: 'women-diversity',
  templateUrl: 'women-diversity.html',
  providers: [CommunityBlogService]
})
export class WomenDiversity {

  /**
   * List of posts from Fedora Community Blog
   */
  private blogposts: Post[];

  constructor(private browser: Browser, private communityblog: CommunityBlogService) {
    this.blogposts = [];
  }

  /**
   * Fetch Blog Posts from the Fedora Community Blog
   */
  private updateBlogPosts(): void {
    this.communityblog.getBlogPosts('454')
      .subscribe(blogposts => {
        this.blogposts = blogposts;
      });
  }

  ngOnInit() {
    this.updateBlogPosts();
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
}
/** Fedora Podcast Component */
@Component({
  selector: 'fedora-podcast',
  templateUrl: 'fedora-podcast.html',
  providers: [PodcastService]
})
export class FedoraPodcast {
  /**
   * List of podcasts from Fedora Podcast
   */
  private podcasts: Podcast[];
  constructor(private fedorapodcast: PodcastService, public navCtrl: NavController) {
    this.podcasts = [];
  }
  /**
   * Fetch podcasts from the Fedora Podcast simplecast channel
   */
  private updatePodcasts(): void {
    this.fedorapodcast.getPodcasts().subscribe(podcasts => {
      this.podcasts = podcasts
    });
  }
  /**Open player for the podcast
   * @param podcast clicked podcast
   */
  openPodcastPlayer(podcast) {
    //podcast player for current podcast
    this.navCtrl.push(PodcastPlayer, { podcast: podcast });
  }
  /**
   * Get latest podcasts on init
   */
  ngOnInit() {
    this.updatePodcasts();
  }
}

/**
 * Podcast Player Component
 */
@Component({
  selector: 'podcast-player',
  templateUrl: 'podcast-player.html',
})
export class PodcastPlayer {
  /**
   * Podcast Player component
   */
  private selectedPodcast; //selected podcast number ex-1,2,3..
  private mp3Track: HTMLAudioElement; //selected podcast mp3 url
  private seektime: number = 10; //seek time of rewind and forward;
  private totalLength: string; //total length of the podcast
  private currTime: string; //current time of the podcast
  private progressValue;  //progress bar width
  public loaderState: boolean; //state of loader
  private playIcon: string = './assets/img/player-play.svg'; //icon for the play button
  private pauseIcon: string = './assets/img/player-pause.svg'; //icon for the pause button
  private playerIcon: string; //current icon for the player i.e either play or pause depending on state
  private currentState: string; //current state of the player i.e playing or not-playing
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedPodcast = navParams.data.podcast;
    this.playerIcon = this.playIcon; //set the icon as play
    this.currentState = 'not-playing';  //set the state as not playing
    this.progressValue = 0; //initialize progress bar value to 0
    this.loaderState = true; //start showing the loader
  }
  ngOnInit() {
    this.toggleTabs('none');
    /**
     * Initialise the podcast
     */
    this.mp3Track = new Audio();
    this.mp3Track.src = this.selectedPodcast.audioUrl;
    this.mp3Track.load();

    /**
     * Add Event listeners - on change and on load
     */
    this.mp3Track.addEventListener('timeupdate', this.updateProgress.bind(this)); //bind the update button
    this.mp3Track.addEventListener('canplaythrough', this.hideLoader.bind(this)); //hide loader if track can be played

    /**
     * Initialise other attributes
     */
    this.currTime = this.fancyTimeFormat(this.mp3Track.currentTime); // init current time
    this.totalLength = this.fancyTimeFormat(this.selectedPodcast.duration); // init total time
    this.loaderState = true; //set loader state
  }
  /**
   * Start Playing the podcast
   */
  playAudio() {
    this.currentState = 'playing'; //update state
    this.mp3Track.play(); //start playing the track
    this.playerIcon = this.pauseIcon; // change the icon
  }
  /**
   * Stop playing the podcast
   */
  stopAudio() {
    this.currentState = 'not-playing'; //update state
    this.mp3Track.pause(); //stop playing the track
    this.playerIcon = this.playIcon; // change the icon
  }
  /**
   * Pause the podcast and reset on leave
   */
  ngOnDestroy() {
    if (this.mp3Track) {
      this.mp3Track.pause();
      this.mp3Track = null;
    }
  }
  /**
   * if the track is not being played, start it otherwise vice-versa
   */
  togglePlay() {
    this.currentState === 'not-playing' ? this.playAudio() : this.stopAudio();
  }
  /**
   * seek podcast forward by 10 seconds
   */
  forward() {
    this.mp3Track.currentTime += this.seektime;
  }
  /**
   *  seek podcast back by 10 seconds
   */
  rewind() {
    this.mp3Track.currentTime -= this.seektime;
  }
  /**
   * Change the current Time and width of progress bar on playing the song
   */
  updateProgress() {
    if (this.mp3Track) {
      this.currTime = this.fancyTimeFormat(this.mp3Track.currentTime); // set current time
      //set progress value if ratio is defined
      isNaN((this.mp3Track.currentTime / this.mp3Track.duration)) ? this.progressValue = 0 : this.progressValue = (this.mp3Track.currentTime / this.mp3Track.duration);
    }
  }
  /**
   * Hide/Show the tabs on the Podcast Player Page
   */
  toggleTabs(status) {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = status;
      });
    }
  }
  /**
   * Hides the loader when the song has loaded
   */
  hideLoader() {
    this.loaderState = false; //stop showing loader
  }
  /**
   * converts time in seconds to MM:SS;
   * @param time in seconds
   */
  fancyTimeFormat(time) {
    var date = new Date(null);
    date.setSeconds(time);
    return date.toISOString().substr(14, 5);
  }
}