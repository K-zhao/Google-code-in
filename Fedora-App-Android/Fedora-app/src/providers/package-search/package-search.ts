import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const API_ENDPOINT = 'https://apps.fedoraproject.org/packages/fcomm_connector/xapian/query/search_packages/';

export interface SearchResult {
  matches: number,
  count: number,
  offset: number,
  pageSize: number,
  packages: Package[]
}

export interface Package {
  name: string,
  summary: string,
  upstreamUrl: string,
  description: string,
  branch: string,
  develOwner: string,
  subPackages: Package[]
}

function mapPackage(pkg: any): Package {
  return {
    name: pkg.name,
    summary: pkg.summary,
    upstreamUrl: pkg.upstream_url,
    description: pkg.description,
    branch: pkg.branch,
    develOwner: pkg.devel_owner,
    subPackages: pkg.sub_pkgs ? pkg.sub_pkgs.map(mapPackage) : false
  };
}

@Injectable()
export class PackageSearchProvider {

  constructor(private http: HttpClient) {
  }

  public search(query: string, limit = 10, offset = 0): Observable<SearchResult> {
    const queryObjectStr = JSON.stringify({
      filters: {
        search: query
      },
      rows_per_page: limit,
      start_row: offset
    });

    return this.http.get(`${API_ENDPOINT}/${queryObjectStr}`)
      .map((res: any) => ({
        matches: res.total_rows,
        count: res.visible_rows,
        offset: res.start_row,
        pageSize: res.rows_per_page,
        packages: res.rows.map(mapPackage)
      }));
  }

}
