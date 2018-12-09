import { Injectable } from '@angular/core';
import ENV from '@environment';
import { Storage } from '@ionic/storage';
import { Facebook } from 'fb';
import { compact } from 'lodash-es';
import { beautifyDate } from '../../utils';
import { SocialProvider, SocialMediaPost, FACEBOOK } from './social';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { merge } from 'rxjs/observable/merge';
import { tap, map } from 'rxjs/operators';
import { defaultValue } from '../../utils';

/**
 * The prefix of the key used for storing offline content
 */
const STORAGE_KEY_PREFIX = 'fedora-social__facebook';

/**
 * Get the key for offline storage which stores the posts for the given page
 *
 * @param page facebook page ID
 * @returns key to use while accessing offline content
 */
function getStorageKey(page: string): string {
  return `${STORAGE_KEY_PREFIX}-${page}`;
}

/**
 * Service for Facebook API
 *
 * Allows to fetch data from Facebook pages.
 */
@Injectable()
export class FacebookProvider implements SocialProvider {

  /**
   * Facebook API instance
   */
  private fb: Facebook;

  constructor(private storage: Storage) {
    this.fb = new Facebook(ENV.FB_CONFIG);
  }

  /**
   * Fetch the list of posts for a given Facebook page from the offline cache
   *
   * @param page ID of the Facebook page
   * @returns Observable which emits an array of Facebook posts
   */
  private loadCachedPosts(page: string): Observable<SocialMediaPost[]> {
    return fromPromise(this.storage.get(getStorageKey(page))).pipe(defaultValue([]));
  }

  /**
   * Perform a call to a Facebook API using the library
   *
   * Converts callback-style error handling to observables.
   *
   * @param uri Facebook API URI
   */
  private api(uri: string) {
    return Observable.create((emitter: Observer<any>) => {
      this.fb.api(uri, res => {
        if (!res || res.error) {
          emitter.error(res.error);
        } else {
          emitter.next(res);
        }
        emitter.complete();
      });
    });
  }

  /**
   * Fetch the list of posts for a given Facebook page
   *
   * @param page ID of the Facebook page
   * @param args Extra args for pagination etc.
   * @returns Observable which emits an array of Facebook posts
   */
  fetchPosts(page: string, args?): Observable<SocialMediaPost[]> {
    return this.api(`${page}/posts`)
      .pipe(
        map((res: any) => {
          const posts = compact<SocialMediaPost>(res.data.map(p => {
            const post = {
              id: p.id,
              link: 'https://facebook.com/' + p.id,
              content: p.message,
              origin: FACEBOOK,
              date: beautifyDate(p.created_time,'social')
            };

            return post.content ? post : null;
          }));

          return posts;
        })
      );
  }

  /**
   * Fetch the list of posts for a given Facebook page
   *
   * This returns a list of cached values followed by values from the API
   * @param page ID of the Facebook page
   * @returns Observable which emits an array of Facebook posts
   */
  public getPosts(page: string): Observable<SocialMediaPost[]> {
    return merge(this.loadCachedPosts(page), this.fetchPosts(page).pipe(
      tap(x => this.storage.set(getStorageKey(page), x))
    ));
  }
}
