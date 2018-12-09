import ENV from '@environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { chooseEndpoint } from '../../utils';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

/* Endpoint for this service.
*
* Since Simplecast API does not support CORS, we need to use a proxy when running
* on browser platforms.
*/
const ENDPOINT = chooseEndpoint('/podcast', 'https://api.simplecast.com/v1/');

/**
 * Podcast ID of Fedora Podcast
 */
const PODCAST_ID = 4543

/**
 * Represents a podcast fetched from Simplecast
 */
export interface Podcast {
    /**
     * Unique ID of the podcast, supplied by the Simplecast API
     */
    id: number,

    /**
     * The Time duration of the podcast
     */
    duration: number,

    /**
     * The Podcast Number
     */

    number: number,

    /**
     * Title of the podcast
     */

    title: string,

    /**
     * Description of the podcast
     */
    description: string,

    /**
     * Date of publishing the podcast
     */
    publishedAt: Date,

    /**
     * URL of Podcast Source File
     */
    audioUrl: string,

    /**
     * Sharing URL of the Podcast Source File
     */
    shareUrl: string
}

/**
 * Service for fetching Podcasts from Community  API
 */
@Injectable()
export class PodcastService {
    constructor(private http: HttpClient) {
    }

    /**
     * Fetch the list of latest podcastss on Fedora Community 
     *
     * @returns Observable which emits an array of Podcasts
     */
    getPodcasts(): Observable<Podcast[]> {
        return this.http.get(`${ENDPOINT}/podcasts/${PODCAST_ID}/episodes.json`, { headers: { 'X-API-KEY': ENV.SIMPLECAST_CONFIG.apiKey } })
            .pipe(
                map((data: any[]) => data.map((podcast: any) => ({
                    id: podcast.id,
                    number: podcast.number,
                    title: podcast.title,
                    duration: podcast.duration,
                    displayTime: Math.floor(podcast.duration/60),//convert to minutes
                    description: podcast.description,
                    publishedAt: podcast.published_at,
                    audioUrl: podcast.audio_url,
                    shareUrl: podcast.share_url
                })))
            );
    }
}