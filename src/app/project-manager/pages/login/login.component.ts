import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, UrlsService } from '@app/services';

@Component({
  selector: 'pm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginPage implements OnInit {
  form;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    public urls: UrlsService
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login(username: string, password: string): void {
    this.auth.login(username, password);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.login(this.form.value.username!, this.form.value.password!);
    }
  }
}
