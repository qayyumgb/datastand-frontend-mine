import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { USERNAME_PATTERN } from '@app/constants';
import { AuthService, UrlsService } from '@app/services';

@Component({
  selector: 'pm-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignUpPage {
  form = this.fb.group({
    username: ['', [Validators.required, Validators.pattern(USERNAME_PATTERN)]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  hasSignedUp = false;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    public urls: UrlsService
  ) {}

  getEmailErrorMessage() {
    if (this.form.controls.email.hasError('required')) {
      return 'Email is required';
    }

    return this.form.controls.email.hasError('email') ? 'Invalid email' : '';
  }

  getUsernameErrorMessage() {
    if (this.form.controls.username.hasError('required')) {
      return 'Username is required';
    }

    return this.form.controls.username.hasError('pattern')
      ? 'Lowercase letters, numbers, and underscores only.'
      : '';
  }

  getPasswordErrorMessage() {
    if (this.form.controls.password.hasError('required')) {
      return 'Password is required';
    }

    return this.form.controls.password.hasError('minlength')
      ? 'Password must be at least 6 characters long'
      : '';
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.auth
      .signUp({
        username: this.form.value.username!,
        first_name: this.form.value.firstName!,
        last_name: this.form.value.lastName!,
        email: this.form.value.email!,
        password: this.form.value.password!,
      })
      .subscribe(() => (this.hasSignedUp = true));
  }
}
