import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@app/environments';
import { Action } from '@app/interfaces';
import { BaseListApiResponse } from './common.interface';

interface ActionStreamApiResponse extends BaseListApiResponse {
  results: Array<Action>;
}

@Injectable({
  providedIn: 'root',
})
export class NewsFeedService {
  url = environment.backendApiUrl;

  constructor(private http: HttpClient) {}

  getStreamFollowing(): Observable<ActionStreamApiResponse> {
    return this.http.get<ActionStreamApiResponse>(
      `${this.url}/activity/actions/streams/following/`
    );
  }
}
