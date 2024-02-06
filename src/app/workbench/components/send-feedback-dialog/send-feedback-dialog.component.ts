// TODO(gustavoauma): Move submitting feedback to a service.

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-send-feedback-dialog',
  templateUrl: './send-feedback-dialog.component.html',
  styleUrls: ['../base-crud-dialog.scss'],
})
export class SendFeedbackDialogComponent {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  onSubmit(contactForm: NgForm) {
    if (contactForm.valid) {
      const email = contactForm.value;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http
        .post(
          'https://formspree.io/f/mwkderva',
          { name: email.name, replyto: email.email, message: email.messages },
          { headers: headers }
        )
        .subscribe((response) => {
          this.showSnackBarFeedbackSent();
        });
    }
  }

  showSnackBarFeedbackSent() {
    this.snackBar.open('Thank you! ❤️ We received your feedback', 'Dismiss');
  }
}
