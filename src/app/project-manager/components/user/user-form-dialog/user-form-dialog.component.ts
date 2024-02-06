import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { UserProfile } from '@app/interfaces';
import { UserService } from '@app/services';
import { COUNTRIES, PRONOUNS } from '@pm/enums';
@Component({
  selector: 'pm-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['../../base-crud-dialog.scss'],
})
export class UserFormDialogComponent implements OnInit {
  @Input() title?: string;
  @Input() userProfile?: UserProfile;
  countryOptions = COUNTRIES;
  pronounsOptions = PRONOUNS;

  form = this.fb.group({
    about: ['', []],
    country: ['', []],
    custom_pronouns: ['', []],
    first_name: ['', []],
    github: ['', []],
    headline: ['', []],
    last_name: ['', []],
    linkedin: ['', []],
    pronouns: ['', []],
    website: ['', []],
  });

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    if (this.userProfile) {
      this.form.controls['about'].setValue(this.userProfile.about!);
      this.form.controls['country'].setValue(this.userProfile.country!);
      this.form.controls['custom_pronouns'].setValue(
        this.userProfile.custom_pronouns!
      );
      this.form.controls['first_name'].setValue(this.userProfile.first_name!);
      this.form.controls['github'].setValue(this.userProfile.github!);
      this.form.controls['headline'].setValue(this.userProfile.headline!);
      this.form.controls['linkedin'].setValue(this.userProfile.linkedin!);
      this.form.controls['last_name'].setValue(this.userProfile.last_name!);
      this.form.controls['pronouns'].setValue(this.userProfile.pronouns!);
      this.form.controls['website'].setValue(this.userProfile.website!);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const data: Partial<UserProfile> = {
        about: this.form.value.about!,
        country: this.form.value.country!,
        custom_pronouns: this.form.value.custom_pronouns!,
        first_name: this.form.value.first_name!,
        github: this.form.value.github!,
        headline: this.form.value.headline!,
        last_name: this.form.value.last_name!,
        linkedin: this.form.value.linkedin!,
        pronouns: this.form.value.pronouns!,
        website: this.form.value.website!,
        username: this.userProfile?.username!,
      };
      // Clear the pronouns if not set to 'custom'
      if (this.form.value.pronouns != 'custom') {
        data.custom_pronouns = '';
      }
      this.userService
        .patch(this.userProfile?.username!, data)
        .subscribe((res: UserProfile) => {
          if (this.userProfile) {
            this.userProfile.about = res.about;
            this.userProfile.country = res.country;
            this.userProfile.custom_pronouns = res.custom_pronouns;
            this.userProfile.first_name = res.first_name;
            this.userProfile.github = res.github;
            this.userProfile.headline = res.headline;
            this.userProfile.last_name = res.last_name;
            this.userProfile.linkedin = res.linkedin;
            this.userProfile.pronouns = res.pronouns;
            this.userProfile.website = res.website;
            // User fields
            // TODO(gustavoauma): Implement these
          }
        });
    }
  }
}
