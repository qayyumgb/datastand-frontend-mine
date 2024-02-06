import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@app/environments';
import { Usage } from '@app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsageService {
  url = environment.backendApiUrl;

  constructor(private http: HttpClient) {}

  getUsage(): Observable<Usage> {
    return this.http.get<Usage>(`${this.url}/usage/`);
  }
}
