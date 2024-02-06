import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@app/environments';
import { TokenLayer } from '@app/workbench/interfaces';

export interface TokenLayerFilters {
  text?: number;
}

@Injectable({
  providedIn: 'root',
})
export class TokenLayerService {
  url = `${environment.backendApiUrl}/token-layers`;

  constructor(private http: HttpClient) {}

  addBoundaries(
    tokenLayerId: number,
    boundaries: number[]
  ): Observable<TokenLayer> {
    return this.http.post<TokenLayer>(
      `${this.url}/${tokenLayerId}/add-boundaries/`,
      { boundaries }
    );
  }

  addBoundary(tokenLayerId: number, boundary: number): Observable<TokenLayer> {
    return this.addBoundaries(tokenLayerId, [boundary]);
  }

  create(tokenLayer: Partial<TokenLayer> | FormData): Observable<TokenLayer> {
    return this.http.post<TokenLayer>(`${this.url}/`, tokenLayer);
  }

  delete(id: number): Observable<Object> {
    return this.http.delete(`${this.url}/${id}/`);
  }

  listFromTaskText(
    taskTextId: number,
    filters: TokenLayerFilters = {}
  ): Observable<TokenLayer[]> {
    let params = new HttpParams({
      fromObject: { ...filters, text: taskTextId },
    });
    return this.http.get<TokenLayer[]>(`${this.url}/`, { params });
  }

  patch(
    tokenLayerId: number,
    tokenLayer: Partial<TokenLayer>
  ): Observable<TokenLayer> {
    return this.http.patch<TokenLayer>(
      `${this.url}/${tokenLayerId}/`,
      tokenLayer
    );
  }

  removeAllBoundaries(tokenLayerId: number): Observable<TokenLayer> {
    return this.http.post<TokenLayer>(
      `${this.url}/${tokenLayerId}/remove-all-boundaries/`,
      {}
    );
  }

  removeBoundaries(
    tokenLayerId: number,
    boundaries: number[]
  ): Observable<TokenLayer> {
    return this.http.post<TokenLayer>(
      `${this.url}/${tokenLayerId}/remove-boundaries/`,
      { boundaries }
    );
  }

  removeBoundary(
    tokenLayerId: number,
    boundary: number
  ): Observable<TokenLayer> {
    return this.removeBoundaries(tokenLayerId, [boundary]);
  }

  tokenize(
    tokenLayerId: number,
    model: string,
    keepExisting: boolean = false
  ): Observable<TokenLayer> {
    return this.http.post<TokenLayer>(`${this.url}/${tokenLayerId}/tokenize/`, {
      model,
      keep_existing: keepExisting,
    });
  }
}
