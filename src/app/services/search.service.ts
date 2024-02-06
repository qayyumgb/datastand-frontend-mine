import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { CorpusService, LabelSetService, TaskService } from '@app/services';
import { BaseFilters, clearFilters } from './common';

export interface SearchFilters extends BaseFilters {
  q?: string;
}

interface SearchApiResponse {
  count: number;
  results: Array<any>;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(
    private corpusService: CorpusService,
    private taskService: TaskService,
    private labelSetService: LabelSetService
  ) {}

  search(
    q: string,
    filters: SearchFilters = {}
  ): Observable<SearchApiResponse> {
    clearFilters(filters); // Remove undefined and null values
    const searchFilters = { search: q, limit: 50, ...filters };
    let response: SearchApiResponse = { count: 0, results: [] };
    return forkJoin([
      this.corpusService.list(searchFilters),
      this.taskService.list(searchFilters),
      this.labelSetService.list(searchFilters),
    ]).pipe(
      mergeMap((res) => {
        res.forEach((subRes) => {
          response.count += subRes.count;
          response.results = [...response.results, ...subRes.results];
        });
        return of(response);
      })
    );
  }
}
