import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserProfile } from '@app/interfaces';
@Component({
  selector: 'app-update-user-profile-dialog',
  templateUrl: './update-user-profile-dialog.component.html',
  styleUrls: [],
})
export class UpdateUserProfileDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: UserProfile) {}
}
