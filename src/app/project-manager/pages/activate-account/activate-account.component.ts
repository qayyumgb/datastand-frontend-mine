import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService, UrlsService } from '@app/services';

@Component({
  selector: 'pm-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss'],
})
export class ActivateAccountPage {
  form = this.fb.group({
    uid: ['', [Validators.required]],
    token: ['', [Validators.required]],
  });
  res?: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public urls: UrlsService,
    private auth: AuthService
  ) {
    this.form.controls['uid'].setValue(this.route.snapshot.params['uid']);
    this.form.controls['token'].setValue(this.route.snapshot.params['token']);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.auth
        .activateUserAccount(this.form.value.uid!, this.form.value.token!)
        .subscribe({
          next: () => {
            this.snackBar.open(
              '✅ Account activated. Redirecting to login...',
              'Close'
            );
            setTimeout(() => {
              this.router.navigateByUrl(this.urls.LOGIN_URL);
            }, 3000);
          },
          error: (err) => {
            if (err.status === 403) {
              this.snackBar.open(
                '🤔 Account is already active. Redirecting to login...',
                'Close'
              );
              setTimeout(() => {
                this.router.navigateByUrl(this.urls.LOGIN_URL);
              }, 3000);
            } else {
              this.snackBar.open('❌ Invalid UID or Token.', 'Dismiss');
            }
          },
        });
    }
  }
}
