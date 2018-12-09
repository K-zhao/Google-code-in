import { Observable } from "rxjs/Observable";

/**
 * ID for facebook provider
 */
export const FACEBOOK = 'facebook';

/**
 * ID for twitter provider
 */
export const TWITTER = 'twitter';

/**
 * Represents a post in social media service
 */
export interface SocialMediaPost {
  /**
   * Service specific unique ID
   */
  id: string,

  /**
   * Origin of the post
   */
  origin: string,

  /**
   * Link to the app of website of the social media service hosting the post
   */
  link: string,

  /**
   * Text content of the post
   */
  content: string,

  /**
   * Date of the post
   */
  date: string,
}

/**
 * A generic social media provider
 */
export interface SocialProvider {

  /**
   * Fetch the list of posts for a given service specific resource ID
   *
   * This may return a cached response
   *
   * @param resID service specific resource ID
   * @returns Observable which emits an array of posts
   */
  getPosts(resID: string): Observable<SocialMediaPost[]>

  /**
   * Fetch the list of posts for a given service specific resource ID, usually
   * from an API call
   *
   * This always returns a value from the underlying API
   *
   * @param resID service specific resource ID
   * @param args Extra args for pagination etc.
   * @returns Observable which emits an array of posts
   */
  fetchPosts(resID: string, args?: { offset?: string }): Observable<SocialMediaPost[]>
}
