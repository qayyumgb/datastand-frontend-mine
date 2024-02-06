import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserSettings } from '@app/interfaces';
import { UserSettingsService } from '@app/services';

@Component({
  selector: 'pm-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsPage {
  userSettings?: UserSettings;
  form = this.fb.group({
    show_home_intro_message: [false, Validators.required],
    show_home_welcome_message: [false, Validators.required],
    show_tasks_welcome_message: [false, Validators.required],
    show_corpora_welcome_message: [false, Validators.required],
    show_labelsets_welcome_message: [false, Validators.required],
    layout: [<'list' | 'card'>'', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private userSettingsService: UserSettingsService,
    private snackBar: MatSnackBar
  ) {
    this.userSettingsService.getMySettings().subscribe((res) => {
      this.userSettings = res;
      this.form.controls['show_home_intro_message'].setValue(
        res.show_home_intro_message!
      );
      this.form.controls['show_home_welcome_message'].setValue(
        res.show_home_welcome_message!
      );
      this.form.controls['show_tasks_welcome_message'].setValue(
        res.show_tasks_welcome_message!
      );
      this.form.controls['show_corpora_welcome_message'].setValue(
        res.show_corpora_welcome_message!
      );
      this.form.controls['show_labelsets_welcome_message'].setValue(
        res.show_labelsets_welcome_message!
      );
      this.form.controls['layout'].setValue(res.layout!);
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const userSettings = {
        layout: this.form.value.layout!,
        show_corpora_welcome_message:
          this.form.value.show_corpora_welcome_message!,
        show_home_welcome_message: this.form.value.show_home_welcome_message!,
        show_home_intro_message: this.form.value.show_home_intro_message!,
        show_labelsets_welcome_message:
          this.form.value.show_labelsets_welcome_message!,
        show_tasks_welcome_message: this.form.value.show_tasks_welcome_message!,
      };
      this.userSettingsService
        .patchMySettings(userSettings)
        .subscribe((res) => {
          this.userSettings = res;
          this.snackBar.open('✅ Settings updated successfully', 'Dismiss');
        });
    }
  }
}
