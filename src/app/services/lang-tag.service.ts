import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@app/environments';
import { LangTag } from '@app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LangTagService {
  url = environment.backendApiUrl;
  // Create a cache to avoid making multiple requests.
  cache: LangTag[] = [];

  constructor(private http: HttpClient) {}

  _getLangTags(): Observable<LangTag[]> {
    return this.http.get<LangTag[]>(`${this.url}/lang-tags/`);
  }

  getLangTags(): Observable<LangTag[]> {
    // Check the cache first, otherwise populate it and return the request.
    if (this.cache.length > 0) {
      return new Observable((observer) => {
        observer.next(this.cache);
        observer.complete();
      });
    } else {
      return new Observable((observer) => {
        this._getLangTags().subscribe((langTags) => {
          this.cache = langTags;
          observer.next(this.cache);
          observer.complete();
        });
      });
    }
  }
}
