import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, UrlsService } from '@app/services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private router: Router,
    private auth: AuthService,
    private urls: UrlsService
  ) {}

  canActivate() {
    if (this.auth.token && this.auth.user) {
      return true;
    }
    this.router.navigateByUrl(this.urls.LOGIN_URL);
    return false;
  }
}

// TODO(gustavoauma): Migrate to authGuard.
export const authGuard: CanActivateFn = (route: any, state: any) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  if (token) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
