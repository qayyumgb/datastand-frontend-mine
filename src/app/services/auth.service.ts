import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '@app/environments';
import { User } from '@app/interfaces';
import { UrlsService } from './urls.service';
import { LoaderService } from './loader.service';

interface UserAuth {
  username: string;
  email: string;
  password: string;
  re_password: string;
}

interface SignUpApiResponse {
  username: string;
  email: string;
}

interface LoginApiResponse {
  auth_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.backendApiUrl;
  authToken?: string;

  get token() {
    return localStorage.getItem('Token');
  }

  get user() {
    if (!localStorage.getItem('User')) {
      return null;
    }
    return JSON.parse(localStorage.getItem('User')!);
  }

  get username() {
    return this.user?.username;
  }

  get first_name() {
    return this.user?.first_name;
  }

  get last_name() {
    return this.user?.last_name;
  }

  get image() {
    return this.user?.image;
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackbar: MatSnackBar,
    private urls: UrlsService,
    private loader:LoaderService

  ) {}

  activateUserAccount(uid: string, token: string): Observable<Object> {
    return this.http.post<Object>(`${this.url}/users/activation/`, {
      uid,
      token,
    });
  }

  clearStorage(): void {
    localStorage.removeItem('Token');
    localStorage.removeItem('User');
  }

  getApiUserMe(token: string): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Token ' + token,
    });
    return this.http.get<User>(`${this.url}/users/me/`, { headers });
  }

  login(username: string, password: string) {
    this.clearStorage();
    return this.http
      .post<LoginApiResponse>(`${this.url}/auth/token/login/`, {
        username,
        password,
      })
      .subscribe({
        next: (res) => {
          this.setToken(res.auth_token);
          this.getApiUserMe(res.auth_token).subscribe({
            next: (user) => {
              this.setUser(user);
              this.router.navigateByUrl(this.urls.PM_URL);
            },
            error: (err) => this.snackbar.open('❌ Invalid user or password'),
          });
        },
        error: (err) => this.snackbar.open('❌ Invalid user or password'),
      });
  }

  logout() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Token ' + this.token,
    });
    return this.http
      .post<null>(`${this.url}/auth/token/logout/`, null, { headers })
      .subscribe({
        next: (res) => {
          this.clearStorage();
          // We always signout to the login page.
          this.router.navigateByUrl(this.urls.LOGIN_URL);
        },
        error: (err) => this.snackbar.open('❌ Failed to logout'),
        complete: () =>{
          this.snackbar.open('✅ Logged out succesfully', 'Dismiss')
          this.loader.showLoader.next(false)
        
        }
      });
  }

  setToken(token: string): void {
    if (localStorage.getItem('Token') !== token) {
      localStorage.setItem('Token', token);
    }
  }

  signUp(userAuth: UserAuth): Observable<SignUpApiResponse> {
    return this.http.post<SignUpApiResponse>(`${this.url}/users/`, userAuth);
  }

  setUser(user: User): void {
    localStorage.setItem('User', JSON.stringify(user));
  }
}
