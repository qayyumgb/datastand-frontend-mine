import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';

import { environment } from '@app/environments';
import { Corpus, Text, User } from '@app/interfaces';
import { runParallelHttpCallsInChunks } from '@pm/utils';

import { AuthService } from './auth.service';
import {
  BaseFilters,
  clearFilters,
  imageToFormData,
  resolveBaseFiltersToParams,
} from './common';
import {
  BaseListApiResponse,
  NumChangedResponse,
  NumDeletedResponse,
} from './common.interface';

export interface CorpusFilters extends BaseFilters {
  // Filters which map directly to the API
  langtag?: string; // en
}

interface CorporaApiResponse extends BaseListApiResponse {
  results: Array<Corpus>;
}

@Injectable({
  providedIn: 'root',
})
export class CorpusService {
  url = `${environment.backendApiUrl}/corpora`;

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  acceptAllSuggestions(corpusId: number): Observable<NumChangedResponse> {
    return this.http.post<NumChangedResponse>(
      `${this.url}/${corpusId}/accept-all-suggestions/`,
      null
    );
  }

  copy(corpusId: number): Observable<Corpus> {
    return this.http.post<Corpus>(`${this.url}/${corpusId}/copy/`, null);
  }

  copyTextsFrom(corpusId: number, otherCorpusId: number): Observable<Corpus> {
    return this.http.post<Corpus>(
      `${this.url}/${corpusId}/copy-texts-from/${otherCorpusId}/`,
      null
    );
  }

  create(corpus: Partial<Corpus>): Observable<Corpus> {
    return this.http.post<Corpus>(`${this.url}/`, corpus);
  }

  dedupeTexts(corpusId: number): Observable<NumDeletedResponse> {
    return this.http.post<NumDeletedResponse>(
      `${this.url}/${corpusId}/dedupe-texts/`,
      null
    );
  }

  delete(corpusId: number): Observable<Object> {
    return this.http.delete(`${this.url}/${corpusId}/`);
  }

  deleteTexts(
    corpusId: number,
    textIds: number[]
  ): Observable<NumDeletedResponse> {
    return this.http.post<NumDeletedResponse>(
      `${this.url}/${corpusId}/delete-texts/`,
      { ids: textIds }
    );
  }

  deleteAllTexts(corpusId: number): Observable<NumDeletedResponse> {
    return this.http.post<NumDeletedResponse>(
      `${this.url}/${corpusId}/delete-all-texts/`,
      null
    );
  }

  download(
    corpusId: number,
    corpusFields: string[] = [],
    textFields: string[] = []
  ) {
    this.snackBar.open('⌛ Preparing Corpus download...', 'Dismiss', {
      duration: 600_000,
    });
    let params = new HttpParams({
      fromObject: {
        fields: corpusFields.join(','),
        text_fields: textFields.join(','),
      },
    });
    return this.http
      .get(`${this.url}/${corpusId}/download/`, {
        params,
        responseType: 'blob',
      })
      .subscribe((blob) => {
        saveAs(blob, `corpus-${corpusId}.json`);
        this.snackBar.open('✅ Corpus downloaded successfully', 'Dismiss');
      });
  }

  downvote(corpusId: number): Observable<Object> {
    return this.http.delete(`${this.url}/${corpusId}/upvote/`);
  }

  fork(corpusId: number): Observable<Corpus> {
    return this.http.post<Corpus>(`${this.url}/${corpusId}/fork/`, null);
  }

  generateText(corpusId: number): Observable<Text> {
    return this.http.post<Text>(`${this.url}/${corpusId}/generate-text/`, null);
  }

  generateTexts(corpusId: number, numTexts: number): Observable<Text> {
    const httpCallFn = () => this.generateText(corpusId);
    return runParallelHttpCallsInChunks<Text>(numTexts, httpCallFn);
  }

  list(filters: CorpusFilters = {}): Observable<CorporaApiResponse> {
    clearFilters(filters); // Remove undefined and null values
    const params = resolveBaseFiltersToParams(filters);
    return this.http.get<CorporaApiResponse>(`${this.url}/`, { params });
  }

  listByMe(filters: CorpusFilters = {}): Observable<CorporaApiResponse> {
    return this.list({ ...filters, creator: this.auth.username });
  }

  listByOthers(filters: CorpusFilters = {}): Observable<CorporaApiResponse> {
    return this.list({ ...filters, creator: 'others', is_public: true });
  }

  listPublic(filters: CorpusFilters = {}): Observable<CorporaApiResponse> {
    return this.list({ ...filters, is_public: true });
  }

  listUpvotes(corpusId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/${corpusId}/upvote/`);
  }

  patch(corpusId: number, corpus: Partial<Corpus>): Observable<Corpus> {
    return this.http.patch<Corpus>(`${this.url}/${corpusId}/`, corpus);
  }

  patchImage(corpusId: number, image: File): Observable<Corpus> {
    let formData = imageToFormData(image);
    return this.http.patch<Corpus>(`${this.url}/${corpusId}/`, formData);
  }

  patchTags(corpusId: number, tags: string[]): Observable<Corpus> {
    return this.http.patch<Corpus>(`${this.url}/${corpusId}/`, { tags });
  }

  rename(corpusId: number, name: string): Observable<Corpus> {
    return this.http.patch<Corpus>(`${this.url}/${corpusId}/`, { name });
  }

  retrieve(corpusId: number): Observable<Corpus> {
    return this.http.get<Corpus>(`${this.url}/${corpusId}/`);
  }

  setTextsAsNotSeeds(
    corpusId: number,
    textIds: number[]
  ): Observable<NumChangedResponse> {
    return this.http.post<NumChangedResponse>(
      `${this.url}/${corpusId}/set-texts-as-not-seeds/`,
      { ids: textIds }
    );
  }

  setTextsAsSeeds(
    corpusId: number,
    textIds: number[]
  ): Observable<NumChangedResponse> {
    return this.http.post<NumChangedResponse>(
      `${this.url}/${corpusId}/set-texts-as-seeds/`,
      { ids: textIds }
    );
  }

  setTextsStatusToPending(
    corpusId: number,
    textIds: number[]
  ): Observable<NumChangedResponse> {
    return this.http.post<NumChangedResponse>(
      `${this.url}/${corpusId}/set-texts-as-pending/`,
      { ids: textIds }
    );
  }

  setTextsStatusToReviewed(
    corpusId: number,
    textIds: number[]
  ): Observable<NumChangedResponse> {
    return this.http.post<NumChangedResponse>(
      `${this.url}/${corpusId}/set-texts-as-reviewed/`,
      { ids: textIds }
    );
  }

  upvote(corpusId: number): Observable<Object> {
    return this.http.post(`${this.url}/${corpusId}/upvote/`, null);
  }
}
