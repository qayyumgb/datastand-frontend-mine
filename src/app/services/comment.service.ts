import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@app/environments';
import { Comment } from '@app/interfaces';

export interface CommentFilters {
  content_type?: string;
  object_id?: number;
}

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  url = `${environment.backendApiUrl}/comments`;

  constructor(private http: HttpClient) {}

  create(comment: Partial<Comment> | FormData): Observable<Comment> {
    return this.http.post<Comment>(`${this.url}/`, comment);
  }

  delete(id: number): Observable<Object> {
    return this.http.delete(`${this.url}/${id}/`);
  }

  listFromTaskText(
    taskTextId: number,
    filters: CommentFilters = {}
  ): Observable<Comment[]> {
    let params = new HttpParams({
      fromObject: {
        ...filters,
        object_id: taskTextId,
        content_type: 'text',
      },
    });
    return this.http.get<Comment[]>(`${this.url}/`, { params });
  }

  patch(commentId: number, comment: Partial<Comment>): Observable<Comment> {
    return this.http.patch<Comment>(`${this.url}/${commentId}/`, comment);
  }
}
