import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService, UrlsService } from '@app/services';

@Component({
  selector: 'pm-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignUpPage {
  form = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    re_password: ['', [Validators.required, Validators.minLength(6)]],
  });
  hasSignedUp = false;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    public urls: UrlsService
  ) {}

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.auth
      .signUp({
        username: this.form.value.username!,
        email: this.form.value.email!,
        password: this.form.value.password!,
        re_password: this.form.value.re_password!,
      })
      .subscribe(() => (this.hasSignedUp = true));
  }
}
