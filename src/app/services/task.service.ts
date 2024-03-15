import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';

import { environment } from '@app/environments';
import { Task, Text } from '@app/interfaces';
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
  NumCreatedResponse,
  NumDeletedResponse,
} from './common.interface';

export interface TaskFilters extends BaseFilters {
  // Filters which map directly to the API
  langtag?: string; // en
}

interface TasksApiResponse extends BaseListApiResponse {
  results: Array<Task>;
}

interface TextIdsApiResponse {
  text_ids: Array<number>;
}

interface TextWithNumSpans extends Text {
  num_spans: number;
}

export interface TaskStatsStatus {
  num_total: number;
  num_completed: number;
  num_in_progress: number;
  num_new: number;
  num_pending: number;
  num_rejected: number;
  ratio_completed: number;
}

interface NgxChartEntry {
  name: string;
  value: number;
}

interface BasicStats {
  histogram: Array<NgxChartEntry>;
  median: number;
  mean: number;
  std: number;
  max: number;
  min: number;
}

interface TextLengthStats extends BasicStats {
  shortest_texts: Array<Text>;
  longest_texts: Array<Text>;
}

interface SpanAnnotation {
  span_value: string;
  label_name: string;
  num_spans: number;
}

interface SpansStats extends BasicStats {
  texts_with_most_spans: Array<TextWithNumSpans>;
  texts_with_fewest_spans: Array<TextWithNumSpans>;
  most_frequent_spans: Array<SpanAnnotation>;
  least_frequent_spans: Array<SpanAnnotation>;
}

interface TaskStats {
  num_texts: number;
  status: TaskStatsStatus;
  text_length: TextLengthStats;
  spans_per_text: SpansStats;
  labels: BasicStats;
  time_per_span: BasicStats;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  url = `${environment.backendApiUrl}/tasks`;

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  acceptAllLabels(taskId: number): Observable<NumChangedResponse> {
    return this.http.post<NumChangedResponse>(
      `${this.url}/${taskId}/accept-all-labels/`,
      null
    );
  }

  acceptAllSuggestions(taskId: number): Observable<NumChangedResponse> {
    return this.http.post<NumChangedResponse>(
      `${this.url}/${taskId}/accept-all-suggestions/`,
      null
    );
  }

  addTokenLayers(
    taskId: number,
    models: string[]
  ): Observable<NumCreatedResponse> {
    return this.http.post<NumCreatedResponse>(
      `${this.url}/${taskId}/add-token-layers/`,
      { models }
    );
  }

  copy(taskId: number): Observable<Task> {
    return this.http.post<Task>(`${this.url}/${taskId}/copy/`, null);
  }

  create(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(`${this.url}/`, task);
  }

  copyTextsFrom(
    taskId: number,
    corpusId: number
  ): Observable<NumCreatedResponse> {
    return this.http.post<NumCreatedResponse>(
      `${this.url}/${taskId}/copy-texts-from/${corpusId}/`,
      null
    );
  }

  copyLabelsFrom(
    taskId: number,
    labelSetId: number
  ): Observable<NumCreatedResponse> {
    return this.http.post<NumCreatedResponse>(
      `${this.url}/${taskId}/copy-labels-from/${labelSetId}/`,
      null
    );
  }

  dedupeLabels(taskId: number): Observable<NumDeletedResponse> {
    return this.http.post<NumDeletedResponse>(
      `${this.url}/${taskId}/dedupe-labels/`,
      null
    );
  }

  dedupeTexts(taskId: number): Observable<NumDeletedResponse> {
    return this.http.post<NumDeletedResponse>(
      `${this.url}/${taskId}/dedupe-texts/`,
      null
    );
  }

  delete(taskId: number): Observable<Object> {
    return this.http.delete(`${this.url}/${taskId}/`);
  }

  deleteAllLabels(taskId: number): Observable<NumDeletedResponse> {
    return this.http.post<NumDeletedResponse>(
      `${this.url}/${taskId}/delete-all-labels/`,
      null
    );
  }

  deleteAllTexts(taskId: number): Observable<NumDeletedResponse> {
    return this.http.post<NumDeletedResponse>(
      `${this.url}/${taskId}/delete-all-texts/`,
      null
    );
  }

  deleteTexts(
    taskId: number,
    textIds: number[]
  ): Observable<NumDeletedResponse> {
    return this.http.post<NumDeletedResponse>(
      `${this.url}/${taskId}/delete-texts/`,
      { ids: textIds }
    );
  }

  download(
    taskId: number,
    taskFields: string[] = [],
    textFields: string[] = [],
    labelFields: string[] = []
  ) {
    this.snackBar.open('⌛ Preparing Task download...', 'Dismiss', {
      duration: 600_000,
    });
    let params = new HttpParams({
      fromObject: {
        fields: taskFields.join(','),
        text_fields: textFields.join(','),
        label_fields: labelFields.join(','),
      },
    });
    return this.http
      .get(`${this.url}/${taskId}/download/`, {
        params,
        responseType: 'blob',
      })
      .subscribe((blob) => {
        saveAs(blob, `task-${taskId}.json`);
        this.snackBar.open('✅ Task downloaded successfully', 'Dismiss');
      });
  }

  generateText(taskId: number): Observable<Text> {
    return this.http.post<Text>(`${this.url}/${taskId}/generate-text/`, null);
  }

  generateTexts(taskId: number, numTexts: number): Observable<Text> {
    const httpCallFn = () => this.generateText(taskId);
    return runParallelHttpCallsInChunks<Text>(numTexts, httpCallFn);
  }

  list(filters: TaskFilters = {}): Observable<TasksApiResponse> {
    clearFilters(filters); // Remove undefined and null values
    const params = resolveBaseFiltersToParams(filters);
    return this.http.get<TasksApiResponse>(`${this.url}/`, { params });
  }

  listByMe(filters: TaskFilters = {}): Observable<TasksApiResponse> {
    return this.list({ ...filters, creator: this.auth.username });
  }

  listTextIds(taskId: number): Observable<TextIdsApiResponse> {
    return this.http.get<TextIdsApiResponse>(`${this.url}/${taskId}/text-ids/`);
  }

  patch(taskId: number, task: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.url}/${taskId}/`, task);
  }

  patchImage(taskId: number, image: File): Observable<Task> {
    let formData = imageToFormData(image);
    return this.http.patch<Task>(`${this.url}/${taskId}/`, formData);
  }

  patchTags(taskId: number, tags: string[]): Observable<Task> {
    return this.http.patch<Task>(`${this.url}/${taskId}/`, { tags });
  }

  progress(taskId: number): Observable<TaskStatsStatus> {
    return this.http.get<TaskStatsStatus>(`${this.url}/${taskId}/progress/`);
  }

  rename(taskId: number, name: string): Observable<Task> {
    return this.http.patch<Task>(`${this.url}/${taskId}/`, { name });
  }

  retrieve(taskId: number): Observable<Task> {
    return this.http.get<Task>(`${this.url}/${taskId}/`);
  }

  setTextsAsNotSeeds(
    taskId: number,
    textIds: number[]
  ): Observable<NumChangedResponse> {
    return this.http.post<NumChangedResponse>(
      `${this.url}/${taskId}/set-texts-as-not-seeds/`,
      { ids: textIds }
    );
  }

  setTextsAsPending(
    taskId: number,
    textIds: number[]
  ): Observable<NumChangedResponse> {
    return this.http.post<NumChangedResponse>(
      `${this.url}/${taskId}/set-texts-as-pending/`,
      { ids: textIds }
    );
  }

  setTextsAsReviewed(
    taskId: number,
    textIds: number[]
  ): Observable<NumChangedResponse> {
    return this.http.post<NumChangedResponse>(
      `${this.url}/${taskId}/set-texts-as-reviewed/`,
      { ids: textIds }
    );
  }

  setTextsAsSeeds(
    taskId: number,
    textIds: number[]
  ): Observable<NumChangedResponse> {
    return this.http.post<NumChangedResponse>(
      `${this.url}/${taskId}/set-texts-as-seeds/`,
      { ids: textIds }
    );
  }

  stats(taskId: number): Observable<TaskStats> {
    return this.http.get<TaskStats>(`${this.url}/${taskId}/stats/`);
  }
}
