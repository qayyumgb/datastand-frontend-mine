import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { LabelSet } from '@app/interfaces';
import { AuthService, LabelSetService, UrlsService } from '@app/services';
import {
  LabelSetDownloadDialogComponent,
  UpdateLabelSetDialogComponent,
} from '@pm/components';

@Component({
  selector: 'pm-label-set-details-header-card',
  templateUrl: './label-set-details-header-card.component.html',
  styleUrls: ['../../change-image-button.scss'],
})
export class LabelSetDetailsHeaderCardComponent implements OnInit {
  @Input() labelSet?: LabelSet;
  isCreator?: boolean;

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private labelSetService: LabelSetService,
    private router: Router,
    private snackBar: MatSnackBar,
    public urls: UrlsService
  ) {}

  ngOnInit(): void {
    this.isCreator = this.labelSet?.creator?.username === this.auth.username;
  }

  changeImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const image: File = event.target.files[0];
      this.labelSetService
        .patchImage(this.labelSet?.id!, image)
        .subscribe((res) => (this.labelSet = res));
    }
  }

  deleteLabelSet() {
    this.labelSetService
      .delete(this.labelSet?.id!)
      .subscribe(() => this.router.navigateByUrl(this.urls.CORPORA_URL));
  }

  forkLabelSet() {
    this.labelSetService.fork(this.labelSet?.id!).subscribe((res: LabelSet) => {
      this.router.navigateByUrl(this.urls.getLabelSetUrl(res.id));
      this.snackBar.open('✅ LabelSet forked succesfully', 'Dismiss');
    });
  }

  openLabelSetDownloadDialog() {
    this.dialog.open(LabelSetDownloadDialogComponent, {
      data: this.labelSet?.id,
    });
  }

  openUpdateLabelSetDialog() {
    this.dialog.open(UpdateLabelSetDialogComponent, {
      data: this.labelSet,
    });
  }
}
