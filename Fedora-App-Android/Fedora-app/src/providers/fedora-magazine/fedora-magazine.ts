import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { merge } from 'rxjs/observable/merge';
import { chooseEndpoint, defaultValue, beautifyDate} from '../../utils';

/**
 * Endpoint for this service.
 *
 * Since Fedora Magazine API does not support CORS, we need to use a proxy when
 * running on browser platforms.
 */
const ENDPOINT = chooseEndpoint('/fedora-magazine', 'https://fedoramagazine.org/wp-json/wp/v2');

/**
 * The key used for storing offline content
 */
const STORAGE_KEY = 'fedora-magazine__posts';

/**
 * Represents a post on Fedora Magazine
 */
export interface Post {
  /**
   * Unique ID of the post, supplied by the CMS
   */
  id: number,

  /**
   * A sluggified link to the post
   */
  link: string,

  /**
   * Permalink to the post
   */
  permalink: string,

  /**
   * Post title
   */
  title: string,

  /**
   * A short excerpt of the post
   */
  excerpt: string,

  /**
   * The content of the post
   */
  content: string,

  /**
   * Time of publication
   */
  publishedAt: string,

  /**
   * Number of comments on the article
   */

  comments: number,

  /**
   * Featured Image of article
   */

  featuredImage: string
}

/**
 * Represents a image on App Carousel fetched from fedora magazine
 */
export interface Image {
  /**
    * Unique ID of the post, supplied by the CMS
    */
  id: number,

  /**
   * A sluggified link to the post
   */
  link: string,

  /**
   * The Image of the post
   */

  image: string
}

/**
 * Service for fetching posts from Fedora Magazine API
 */
@Injectable()
export class FedoraMagazineService {

  constructor(private http: HttpClient, private storage: Storage) {
  }

  /**
   * Fetch the list of posts on Fedora Magazine from offline cache
   *
   * @returns Observable which emits an array of posts
   */
  private loadCachedPosts() {
    return fromPromise(this.storage.get(STORAGE_KEY)).pipe(defaultValue([]));
  }

  /**
   * Fetch the list of latest posts on Fedora Magazine from Fedora Magazine API
   *
   * @returns Observable which emits an array of posts
   */
  fetchPosts(postCount): Observable<Post[]> {
    return this.http.get(`${ENDPOINT}/posts`, { params: { '_embed': '', 'per_page': postCount } })
      .pipe(
        map((data: any[]) => data.map((post: any) => ({
          id: post.id,
          link: post.link,
          permalink: post.guid.rendered,
          title: post.title.rendered,
          image: post.featured_media,
          excerpt: post.excerpt.rendered,
          content: post.content.rendered,
          publishedAt: beautifyDate(post.date_gmt, 'blog'),
          featuredImage: post._embedded['wp:featuredmedia']['0'].media_details.sizes.medium.source_url,
          comments: post._embedded['replies'] !== undefined ? post._embedded['replies']['0'].length : 0,
        })))
      );
  }

  /**
   * Fetch the list of posts on Fedora Magazine
   *
   * Loads from offline cache first and then from HTTP. The response of the HTTP
   * request is persisted into the disk cache for further requests.
   *
   * @returns Observable which emits an array of posts
   */
  getPosts(postCount) {
    return merge(this.loadCachedPosts(), this.fetchPosts(postCount).pipe(
      tap(x => this.storage.set(STORAGE_KEY, x)))
    );
  }

  /**
   * Fetch the list of latest images on Fedora Magazine
   *
   * @returns Observable which emits an array of images
   */
  getImages(): Observable<Image[]> {

    let pageResults = '5'; // get top 5 posts only
    let imageCategory = '609'; //get posts from New in Fedora category

    return this.http.get(`${ENDPOINT}/posts`, { params: { 'per_page': pageResults, 'categories': imageCategory, '_embed': '' } })
      .map((data: any[]) => data.map((image: any) => ({
        id: image.id,
        link: image.link,
        image: image._embedded['wp:featuredmedia']['0'].media_details.sizes.medium_large.source_url
      })));
  }
}
