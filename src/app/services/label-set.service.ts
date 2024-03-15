import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';

import { environment } from '@app/environments';
import { Label, LabelSet, User } from '@app/interfaces';

import { AuthService } from './auth.service';
import {
  BaseFilters,
  clearFilters,
  fileToFormData,
  imageToFormData,
  resolveBaseFiltersToParams,
} from './common';
import {
  BaseListApiResponse,
  NumChangedResponse,
  NumDeletedResponse,
} from './common.interface';

export interface LabelSetFilters extends BaseFilters {}

interface LabelSetsApiResponse extends BaseListApiResponse {
  results: Array<LabelSet>;
}

@Injectable({
  providedIn: 'root',
})
export class LabelSetService {
  url = `${environment.backendApiUrl}/label-sets`;

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  copy(labelSetId: number): Observable<LabelSet> {
    return this.http.post<LabelSet>(`${this.url}/${labelSetId}/copy/`, null);
  }

  copyLabelsFrom(
    labelSetId: number,
    otherlabelSetId: number
  ): Observable<LabelSet> {
    return this.http.post<LabelSet>(
      `${this.url}/${labelSetId}/copy-labels-from/${otherlabelSetId}/`,
      null
    );
  }

  create(labelSet: Partial<LabelSet>): Observable<LabelSet> {
    return this.http.post<LabelSet>(`${this.url}/`, labelSet);
  }

  delete(labelSetId: number): Observable<Object> {
    return this.http.delete(`${this.url}/${labelSetId}/`);
  }

  download(
    labelSetId: number,
    labelSetFields: string[] = [],
    labelFields: string[] = []
  ) {
    this.snackBar.open('⌛ Preparing Label Set download...', 'Dismiss', {
      duration: 600_000,
    });
    let params = new HttpParams({
      fromObject: {
        fields: labelSetFields.join(','),
        label_fields: labelFields.join(','),
      },
    });
    return this.http
      .get(`${this.url}/${labelSetId}/download/`, {
        params,
        responseType: 'blob',
      })
      .subscribe((blob) => {
        saveAs(blob, `label-set-${labelSetId}.json`);
        this.snackBar.open('✅ Label Set downloaded successfully', 'Dismiss');
      });
  }

  downvote(labelSetId: number): Observable<Object> {
    return this.http.delete(`${this.url}/${labelSetId}/upvote/`);
  }

  fork(labelSetId: number): Observable<LabelSet> {
    return this.http.post<LabelSet>(`${this.url}/${labelSetId}/fork/`, null);
  }

  retrieve(labelSetId: number): Observable<LabelSet> {
    return this.http.get<LabelSet>(`${this.url}/${labelSetId}/`);
  }

  list(filters: LabelSetFilters = {}): Observable<LabelSetsApiResponse> {
    clearFilters(filters); // Remove undefined and null values
    const params = resolveBaseFiltersToParams(filters);
    return this.http.get<LabelSetsApiResponse>(`${this.url}/`, { params });
  }

  listUpvotes(labelSetId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/${labelSetId}/upvote/`);
  }

  listByMe(filters: LabelSetFilters = {}): Observable<LabelSetsApiResponse> {
    return this.list({ ...filters, creator: this.auth.username });
  }

  listByOthers(
    filters: LabelSetFilters = {}
  ): Observable<LabelSetsApiResponse> {
    return this.list({ ...filters, creator: 'others', is_public: true });
  }

  listPublic(filters: LabelSetFilters = {}): Observable<LabelSetsApiResponse> {
    return this.list({ ...filters, is_public: true });
  }

  importLabelsFromCsv(labelSetId: number, csvFile: File): Observable<Label[]> {
    let formData = fileToFormData(csvFile);
    return this.http.put<Label[]>(
      `${this.url}/${labelSetId}/import-csv/`,
      formData
    );
  }

  acceptAllLabels(labelSetId: number): Observable<NumChangedResponse> {
    return this.http.post<NumChangedResponse>(
      `${this.url}/${labelSetId}/accept-all-labels/`,
      null
    );
  }

  dedupeLabels(labelSetId: number): Observable<NumDeletedResponse> {
    return this.http.post<NumDeletedResponse>(
      `${this.url}/${labelSetId}/dedupe-labels/`,
      null
    );
  }

  deleteAllLabels(labelSetId: number): Observable<NumDeletedResponse> {
    return this.http.post<NumDeletedResponse>(
      `${this.url}/${labelSetId}/delete-all-labels/`,
      null
    );
  }

  patch(labelSetId: number, labelSet: Partial<LabelSet>): Observable<LabelSet> {
    return this.http.patch<LabelSet>(`${this.url}/${labelSetId}/`, labelSet);
  }

  patchImage(labelSetId: number, image: File): Observable<LabelSet> {
    let formData = imageToFormData(image);
    return this.http.patch<LabelSet>(`${this.url}/${labelSetId}/`, formData);
  }

  patchTags(labelSetId: number, tags: string[]): Observable<LabelSet> {
    return this.http.patch<LabelSet>(`${this.url}/${labelSetId}/`, { tags });
  }

  rename(labelSetId: number, name: string): Observable<LabelSet> {
    return this.http.patch<LabelSet>(`${this.url}/${labelSetId}/`, { name });
  }

  upvote(labelSetId: number): Observable<Object> {
    return this.http.post(`${this.url}/${labelSetId}/upvote/`, null);
  }
}
