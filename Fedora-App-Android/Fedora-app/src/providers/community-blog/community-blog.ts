import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { chooseEndpoint, beautifyDate } from '../../utils';
import { Post } from '../fedora-magazine/fedora-magazine';

const ENDPOINT = chooseEndpoint('/community-blog', 'https://communityblog.fedoraproject.org/wp-json/wp/v2');

/**
 * Service for fetching posts from Community Blog API
 */
@Injectable()
export class CommunityBlogService {
    constructor(private http: HttpClient) {
    }

    /**
     * Fetch the list of latest posts on Fedora Community Blog
     *
     * @param category from which posts are to be fetched
     * @returns Observable which emits an array of blog posts
     */
    getBlogPosts(category): Observable<Post[]> {

        let request;
        //if no category is specified, fetch posts without parameters.
        category === 'null' ? request = this.http.get(`${ENDPOINT}/posts`) : request = this.http.get(`${ENDPOINT}/posts`, { params: {'categories': category}});

        return request.map((data: any[]) => data.map((blogpost: any) => ({
                id: blogpost.id,
                link: blogpost.link,
                permalink: blogpost.guid.rendered,
                title: blogpost.title.rendered,
                excerpt: blogpost.excerpt.rendered,
                content: blogpost.content.rendered,
                publishedAt: beautifyDate(blogpost.date_gmt, 'blog'),
                comments: null,
                featuredImage:''
            })));
    }
}