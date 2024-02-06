import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@app/environments';
import { Follower, UserProfile } from '@app/interfaces';
import { AuthService } from './auth.service';
import { imageToFormData } from './common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = `${environment.backendApiUrl}/users`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  follow(username: string): Observable<Object> {
    return this.http.post(`${this.url}/${username}/follow/`, null);
  }

  listFollowers(username: string): Observable<Follower[]> {
    return this.http.get<Follower[]>(`${this.url}/${username}/followers/`);
  }

  listFollowing(username: string): Observable<Follower[]> {
    return this.http.get<Follower[]>(`${this.url}/${username}/following/`);
  }

  patch(
    username: string,
    userProfile: Partial<UserProfile> | FormData
  ): Observable<UserProfile> {
    return this.http.patch<UserProfile>(
      `${this.url}/${username}/`,
      userProfile
    );
  }

  patchImage(username: string, image: File): Observable<UserProfile> {
    let formData = imageToFormData(image);
    return this.http.patch<UserProfile>(`${this.url}/${username}/`, formData);
  }

  retrieve(username: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.url}/${username}/`);
  }

  retrieveMe(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.url}/me/`);
  }

  unfollow(username: string): Observable<Object> {
    return this.http.post(`${this.url}/${username}/unfollow/`, null);
  }
}
