import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { chooseEndpoint } from '../../utils';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { merge } from 'rxjs/observable/merge';
import { map, tap } from 'rxjs/operators';
import { defaultValue, convertToRelativeTime} from '../../utils';

/**
 * Ask Fedora API endpoint
 *
 * It does not support CORS so we have to proxy it through Ionic CLI during development
 */
const ENDPOINT = chooseEndpoint('/ask-fedora', 'https://ask.fedoraproject.org/en/api/v1');

/**
 * The key used for storing offline content
 */
const STORAGE_KEY = 'fedora-ask__questions';


/**
 * A question on Ask Fedora
 */
export interface Question {
  /**
   * Question ID
   */
  id: number,

  /**
   * Question title
   */
  title: string,

  /**
   * Permalink to the question
   */
  link: string,

  /**
   * Number of answers to this question
   */
  answerCount: number,

  /**
   * Content of this question
   */
  content: string,

  /**
   * Time of posting of this question
   */
  addedAt: string,

  /**
   * Tags associated with this question
   */
  tags: string[],

  /**
   * Number of views registered by this question
   */
  viewCount: number,

  /**
   * Total score for this question
   *
   * It is the sum of all up-votes and down-votes.
   */
  score: number,
}

/**
 * Service for Ask Fedora API
 *
 * Provides a read-only access to questions and answers posted in Ask Fedora.
 */
@Injectable()
export class AskFedoraService {

  constructor(private http: HttpClient, private storage: Storage) {
  }

  /**
   * Fetch a list of questions on Ask Fedora from offline cache
   *
   * @returns Observable which emits an array of questions
   */
  private loadCachedQuestions(): Observable<Question[]> {
    return fromPromise(this.storage.get(STORAGE_KEY)).pipe(defaultValue([]));
  }

  /**
   * Fetch a list of questions from Ask Fedora API
   *
   * @returns Observable which emits an array of questions
   */
  fetchQuestions(type:string): Observable<Question[]> {
    return this.http.get(`${ENDPOINT}/questions/`,{ params: { 'sort': type + '-desc' } })
      .pipe(
        map((data: any) => (data.questions as any[]).map(q => ({
          id: q.id,
          title: q.title,
          link: q.url,
          answerCount: q.answer_count,
          content: q.summary,
          addedAt: convertToRelativeTime(q.last_activity_at),
          tags: q.tags.toString().split(','),
          viewCount: q.view_count,
          score: q.score,
        })))
      );
  }

  /**
   * Fetch a list of questions on Ask Fedora
   * Loads from offline cache first and then from HTTP. The response of the HTTP
   * request is persisted into the disk cache for further requests.
   *
   * @returns Observable which emits an array of questions
   */
  getQuestions(type:string): Observable<Question[]> {
    return merge(this.loadCachedQuestions(), this.fetchQuestions(type).pipe(
      tap(x => this.storage.set(STORAGE_KEY, x)))
    );
  }
}
