import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlsService {
  // TODO(gustavoauma): Change this.
  DEFAULT_IMG_URL =
    'https://storage.googleapis.com/datastand-backend-static/img/defaults/monstera.jpg';
  PM_URL = '/pm';
  LOGIN_URL = '/login';
  SIGNUP_URL = '/signup';
  CORPORA_URL = '/pm/corpora';
  LABEL_SETS_URL = '/pm/label-sets';
  PM_PUBLIC_URL = '/pm/public';
  PUBLIC_CORPORA_URL = '/pm/public/corpora';
  PUBLIC_LABEL_SETS_URL = '/pm/public/label-sets';
  TASKS_URL = '/pm/tasks';
  _TASK_ITEMS_URL = '/pm/task';
  USERS_URL = '/pm/users';
  USER_SETTINGS_URL = '/pm/user-settings';
  SEARCH_URL = '/pm/search';

  constructor() {}

  getCorpusUrl(corpusId: number): string {
    return `${this.CORPORA_URL}/${corpusId}`;
  }

  getLabelSetUrl(labelSetId: number): string {
    return `${this.LABEL_SETS_URL}/${labelSetId}`;
  }

  getTaskUrl(taskId: number): string {
    return `${this.TASKS_URL}/${taskId}`;
  }

  getTaskLabelsUrl(taskId: number): string {
    return `${this.TASKS_URL}/${taskId}/labels`;
  }

  getTaskStatisticsUrl(taskId: number): string {
    return `${this.TASKS_URL}/${taskId}/statistics`;
  }

  getTaskTextsUrl(taskId: number): string {
    return `${this.TASKS_URL}/${taskId}/texts`;
  }

  getTaskTextUrl(taskId: number, taskTextId: number): string {
    const taskUrl = this.getTaskUrl(taskId);
    return `${taskUrl}/items/${taskTextId}`;
  }

  getUserUrl(username: string): string {
    return `${this.USERS_URL}/${username}`;
  }
}
