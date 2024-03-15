import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { LabelSet } from '@app/interfaces';
import { AuthService, LabelSetService, UrlsService } from '@app/services';
import {
  RenameDialogComponent,
  UpdateTagsDialogComponent,
} from '@pm/components';
import { isCreator, truncate } from '@pm/utils';

@Component({
  selector: 'pm-label-set-card',
  templateUrl: './label-set-card.component.html',
  styleUrls: ['../../data-card.scss', '../../change-image-button.scss'],
})
export class LabelSetCardComponent implements OnInit {
  @Input() labelSet?: LabelSet;
  @Output() deleteLabelSetEvent = new EventEmitter<number>(); // labelSetId
  truncate = truncate;
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
    this.isCreator = isCreator(this.labelSet!, this.auth.username);
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
    this.labelSetService.delete(this.labelSet?.id!).subscribe(() => {
      // We need to emit an event for the parent to update the count.        this.deleteCorpusEvent.emit(corpus?.id);
      this.deleteLabelSetEvent.emit(this.labelSet?.id);
      delete this.labelSet;
    });
  }

  forkLabelSet() {
    this.labelSetService.fork(this.labelSet?.id!).subscribe((res: LabelSet) => {
      this.router.navigateByUrl(this.urls.getLabelSetUrl(res.id));
      this.snackBar.open('✅ Label set forked succesfully', 'Dismiss');
    });
  }

  openRenameLabelSetDialog() {
    this.dialog.open(RenameDialogComponent, {
      data: { element: this.labelSet, type: 'label-set' },
    });
  }

  openUpdateTagsDialog() {
    this.dialog.open(UpdateTagsDialogComponent, {
      data: { element: this.labelSet, type: 'label-set' },
    });
  }
}
