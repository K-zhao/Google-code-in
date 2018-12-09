import ENV from '@environment';
import { Injectable } from '@angular/core';
import { beautifyDate } from '../../utils';
import { SocialProvider, SocialMediaPost } from './social';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { merge } from 'rxjs/observable/merge';
import { chooseEndpoint, defaultValue } from '../../utils';

/**
 * Endpoint for this service.
 *
 * Since Twitter API does not support CORS, we need to use a proxy when running
 * on browser platforms.
 */
const ENDPOINT = chooseEndpoint('/twitter', 'https://api.twitter.com/1.1');

/**
 * The prefix of the key used for storing offline content
 */
const STORAGE_KEY_PREFIX = 'fedora-social__twitter';

/**
 * Get the key for offline storage which stores the tweets for the given handle
 *
 * @param handle twitter handle
 * @returns key to use while accessing offline content
 */
function getStorageKey(handle: string): string {
  return `${STORAGE_KEY_PREFIX}-${handle}`;
}

/**
 * Service for Twitter API
 */
@Injectable()
export class TwitterProvider implements SocialProvider {

  constructor(private http: HttpClient, private storage: Storage) {
  }

  /**
   * Fetch tweets for a handle from offline cache
   *
   * @param handle twitter handle
   * @returns Observable which emits an array of tweets
   */
  private loadCachedPosts(handle: string): Observable<SocialMediaPost[]> {
    return fromPromise(this.storage.get(getStorageKey(handle))).pipe(defaultValue([]));
  }

  /**
   * Fetch the list of tweets for a given Twitter handle from Twitter API
   *
   * @param handle Twitter handle whose tweets to load
   * @param args   Extra args for pagination etc.
   * @returns Observable which emits an array of tweets
   */
  fetchPosts(handle: string, args?): Observable<SocialMediaPost[]> {
    return this.http.get(`${ENDPOINT}/statuses/user_timeline.json`, {
      params: { screen_name: handle },
      headers: { 'Authorization': 'Bearer ' + ENV.TWITTER_CONFIG.BEARER_TOKEN }
    }).pipe(
      map((tweetsResponse: any) => tweetsResponse.map(t => ({
        id: t.id,
        link: 'https://twitter.com/statuses/' + t.id_str,
        content: t.text,
        origin: 'twitter',
        date: beautifyDate(t.created_at,'social')
      })))
    );
  }

  /**
   * Fetch the list of tweets for a given Twitter handle
   *
   * This returns a list of cached values followed by values from the API
   *
   * @param handle Twitter handle whose tweets to load
   * @returns Observable which emits an array of tweets
   */
  public getPosts(handle: string): Observable<SocialMediaPost[]> {
    return merge(this.loadCachedPosts(handle), this.fetchPosts(handle).pipe(
      tap(x => this.storage.set(getStorageKey(handle), x))
    ));
  }
}

