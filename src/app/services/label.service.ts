import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@app/environments';
import { Label } from '@app/interfaces';
import {
  BaseFilters,
  clearFilters,
  imageToFormData,
  resolveBaseFiltersToParams,
} from './common';
import { BaseListApiResponse } from './common.interface';

export interface LabelFilters extends BaseFilters {
  // Filters which map directly to the API
  object_id?: number | string;
  content_type?: 'labelset' | 'task';
  is_pending?: boolean | string;
}

interface LabelsApiResponse extends BaseListApiResponse {
  results: Array<Label>;
}

@Injectable({
  providedIn: 'root',
})
export class LabelService {
  url = `${environment.backendApiUrl}/labels`;

  constructor(private http: HttpClient) {}

  copy(labelId: number): Observable<Label> {
    return this.http.post<Label>(`${this.url}/${labelId}/copy/`, null);
  }

  create(label: Partial<Label>): Observable<Label> {
    return this.http.post<Label>(`${this.url}/`, label);
  }

  delete(labelId: number): Observable<Object> {
    return this.http.delete(`${this.url}/${labelId}/`);
  }

  list(filters: LabelFilters = {}): Observable<LabelsApiResponse> {
    clearFilters(filters); // Remove undefined and null values
    const params = resolveBaseFiltersToParams(filters);
    return this.http.get<LabelsApiResponse>(`${this.url}/`, { params });
  }

  listFromLabelSet(
    labelSetId: number,
    filters: LabelFilters = {}
  ): Observable<LabelsApiResponse> {
    return this.list({
      ...filters,
      content_type: 'labelset',
      object_id: labelSetId,
    });
  }

  listFromTask(
    taskId: number,
    filters: LabelFilters = {}
  ): Observable<LabelsApiResponse> {
    return this.list({ ...filters, content_type: 'task', object_id: taskId });
  }

  patch(labelId: number, label: Partial<Label>): Observable<Label> {
    return this.http.patch<Label>(`${this.url}/${labelId}/`, label);
  }

  patchImage(labelId: number, image: File): Observable<Label> {
    let formData = imageToFormData(image);
    return this.http.patch<Label>(`${this.url}/${labelId}/`, formData);
  }

  patchTags(labelId: number, tags: string[]): Observable<Label> {
    return this.http.patch<Label>(`${this.url}/${labelId}/`, { tags });
  }

  rename(labelId: number, name: string): Observable<Label> {
    return this.http.patch<Label>(`${this.url}/${labelId}/`, { name });
  }

  setAsPending(labelId: number): Observable<Label> {
    return this.http.patch<Label>(`${this.url}/${labelId}/`, {
      is_pending: true,
    });
  }

  setAsReviewed(labelId: number): Observable<Label> {
    return this.http.patch<Label>(`${this.url}/${labelId}/`, {
      is_pending: false,
    });
  }
}
