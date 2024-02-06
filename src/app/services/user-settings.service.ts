import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@app/environments';
import { UserSettings } from '@app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  url = `${environment.backendApiUrl}/my-settings`;
  private data?: UserSettings;

  get layout() {
    return this.data?.layout;
  }

  get show_home_welcome_message() {
    return this.data?.show_home_welcome_message;
  }

  get show_home_intro_message() {
    return this.data?.show_home_intro_message;
  }

  constructor(private http: HttpClient) {
    this.getMySettings().subscribe((res) => (this.data = res));
  }

  _set(field: string, value: any) {
    this.patchMySettings({ [field]: value }).subscribe(
      (res) => (this.data = res)
    );
  }

  // TODO(gustavoauma): Update this path when the backend is fixed.
  getMySettings(): Observable<UserSettings> {
    return this.http.get<UserSettings>(`${this.url}/get_settings/`);
  }

  // TODO(gustavoauma): Update this path when the backend is fixed.
  patchMySettings(
    userSettings: Partial<UserSettings>
  ): Observable<UserSettings> {
    return this.http.patch<UserSettings>(
      `${this.url}/patch_settings/`,
      userSettings
    );
  }

  hideHomeIntroMessage() {
    this._set('show_home_intro_message', false);
  }
  hideHomeWelcomeMessage() {
    this._set('show_home_welcome_message', false);
  }

  isCardLayout() {
    return this.layout === 'card';
  }

  isListLayout() {
    return this.layout === 'list';
  }

  hideTasksWelcomeMessage() {
    this._set('show_tasks_welcome_message', false);
  }

  showHomeIntroMessage() {
    this._set('show_home_intro_message', true);
  }

  showHomeWelcomeMessage() {
    this._set('show_home_welcome_message', true);
  }

  showTasksWelcomeMessage() {
    this._set('show_tasks_welcome_message', true);
  }

  toggleLayout() {
    if (this.data?.layout === 'card') {
      this.useListLayout();
    } else {
      this.useCardLayout();
    }
  }

  useListLayout() {
    this._set('layout', 'list');
  }

  useCardLayout() {
    this._set('layout', 'card');
  }
}
