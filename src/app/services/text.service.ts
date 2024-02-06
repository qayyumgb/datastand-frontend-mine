import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@app/environments';
import { Text } from '@app/interfaces';
import { StatusEnum } from '@app/interfaces/abstract';
import { TokenLayer } from '@app/workbench/interfaces';
import {
  BaseFilters,
  clearFilters,
  resolveBaseFiltersToParams,
} from './common';
import {
  BaseListApiResponse,
  NumChangedResponse,
  NumDeletedResponse,
} from './common.interface';

export interface TextFilters extends BaseFilters {
  // Filters which map directly to the API
  langtag?: string; // en
  status?: StatusEnum | string;
  is_pending?: boolean | string;
  corpus?: number | string;
  task?: number | string;
}

interface TextsApiResponse extends BaseListApiResponse {
  results: Array<Text>;
}

@Injectable({
  providedIn: 'root',
})
export class TextService {
  url = `${environment.backendApiUrl}/texts`;

  constructor(private http: HttpClient) {}

  acceptSpanSuggestions(taskTextId: number): Observable<NumChangedResponse> {
    return this.http.post<NumChangedResponse>(
      `${this.url}/${taskTextId}/accept-span-suggestions/`,
      {}
    );
  }

  addBasicTokenLayers(taskTextId: number): Observable<TokenLayer[]> {
    return this.http.post<TokenLayer[]>(
      `${this.url}/${taskTextId}/add-basic-token-layers/`,
      {}
    );
  }

  copy(textId: number): Observable<Text> {
    return this.http.post<Text>(`${this.url}/${textId}/copy/`, {});
  }

  create(text: Partial<Text> | FormData): Observable<Text> {
    return this.http.post<Text>(`${this.url}/`, text);
  }

  delete(textId: number): Observable<Object> {
    return this.http.delete(`${this.url}/${textId}/`);
  }

  listFromCorpus(
    corpusId: number,
    filters: TextFilters = {}
  ): Observable<TextsApiResponse> {
    clearFilters(filters); // Remove undefined and null values
    let params = resolveBaseFiltersToParams(filters, 100);
    params = params.append('content_type', 'corpus');
    params = params.append('object_id', corpusId);
    return this.http.get<TextsApiResponse>(`${this.url}/`, { params });
  }

  listFromTask(
    taskId: number,
    filters: TextFilters = {}
  ): Observable<TextsApiResponse> {
    clearFilters(filters); // Remove undefined and null values
    let params = resolveBaseFiltersToParams(filters, 100);
    params = params.append('content_type', 'task');
    params = params.append('object_id', taskId);
    return this.http.get<TextsApiResponse>(`${this.url}/`, { params });
  }

  patch(textId: number, text: Partial<Text> | FormData): Observable<Text> {
    return this.http.patch<Text>(`${this.url}/${textId}/`, text);
  }

  patchTags(textId: number, tags: string[]): Observable<Text> {
    return this.http.patch<Text>(`${this.url}/${textId}/`, { tags });
  }

  rename(textId: number, name: string): Observable<Text> {
    return this.http.patch<Text>(`${this.url}/${textId}/`, { name });
  }

  rejectSpanSuggestions(taskTextId: number): Observable<NumDeletedResponse> {
    return this.http.post<NumDeletedResponse>(
      `${this.url}/${taskTextId}/reject-span-suggestions/`,
      {}
    );
  }

  retrieve(textId: number): Observable<Text> {
    return this.http.get<Text>(`${this.url}/${textId}/`);
  }

  _setStatus(taskTextId: number, value: StatusEnum): Observable<Text> {
    return this.http.patch<Text>(`${this.url}/${taskTextId}/`, {
      status: value,
    });
  }

  setStatusToCompleted(taskTextId: number): Observable<Text> {
    return this._setStatus(taskTextId, StatusEnum.COMPLETED);
  }

  setStatusToInProgress(taskTextId: number): Observable<Text> {
    return this._setStatus(taskTextId, StatusEnum.IN_PROGRESS);
  }

  setStatusToNew(taskTextId: number): Observable<Text> {
    return this._setStatus(taskTextId, StatusEnum.NEW);
  }
  setStatusToPending(taskTextId: number): Observable<Text> {
    return this.http.patch<Text>(`${this.url}/${taskTextId}/`, {
      is_pending: true,
      status: StatusEnum.PENDING,
    });
  }

  setStatusToRejected(taskTextId: number): Observable<Text> {
    return this._setStatus(taskTextId, StatusEnum.REJECTED);
  }
  setAsPending(textId: number): Observable<Text> {
    return this.http.patch<Text>(`${this.url}/${textId}/`, {
      is_pending: true,
      status: StatusEnum.PENDING,
    });
  }

  setAsReviewed(textId: number): Observable<Text> {
    return this.http.patch<Text>(`${this.url}/${textId}/`, {
      is_pending: false,
      status: StatusEnum.REVIEWED,
    });
  }
}
