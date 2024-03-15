import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@app/environments';
import { Span } from '@app/workbench/interfaces';

export interface SpanFilters {
  text?: number;
  label?: number;
}

@Injectable({
  providedIn: 'root',
})
export class SpanService {
  url = `${environment.backendApiUrl}/spans`;

  constructor(private http: HttpClient) {}

  annotateSimilar(id: number): Observable<Span[]> {
    return this.http.post<Span[]>(`${this.url}/${id}/annotate-similar/`, {});
  }

  create(span: Partial<Span> | FormData): Observable<Span> {
    return this.http.post<Span>(`${this.url}/`, span);
  }

  delete(id: number): Observable<Object> {
    return this.http.delete(`${this.url}/${id}/`);
  }

  listFromTaskText(
    taskTextId: number,
    filters: SpanFilters = {}
  ): Observable<Span[]> {
    let params = new HttpParams({
      fromObject: { ...filters, text: taskTextId },
    });
    return this.http.get<Span[]>(`${this.url}/`, { params });
  }

  patch(spanId: number, span: Partial<Span>): Observable<Span> {
    return this.http.patch<Span>(`${this.url}/${spanId}/`, span);
  }

  setStatusToPending(spanId: number): Observable<Span> {
    return this.http.patch<Span>(`${this.url}/${spanId}/`, {
      is_pending: true,
      status: 'pending',
    });
  }

  setStatusToReviewed(spanId: number): Observable<Span> {
    return this.http.patch<Span>(`${this.url}/${spanId}/`, {
      is_pending: false,
      status: 'accepted',
    });
  }

  acceptSuggestion(spanId: number): Observable<Span> {
    return this.http.patch<Span>(`${this.url}/${spanId}/`, {
      suggestion_status: 'accepted',
    });
  }

  // By default, rejecting a suggestion just removes the span.
  rejectSuggestion = this.delete;
}
