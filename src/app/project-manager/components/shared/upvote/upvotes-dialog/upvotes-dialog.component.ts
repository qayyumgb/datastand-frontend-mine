import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '@app/interfaces';
import { CorpusService, LabelSetService } from '@app/services';

interface UpvotesDialogData {
  elementId?: number;
  element?: 'corpus' | 'label' | 'label-set';
}

@Component({
  selector: 'pm-upvotes-dialog',
  templateUrl: './upvotes-dialog.component.html',
  styleUrls: ['./upvotes-dialog.component.scss'],
})
export class UpvotesDialogComponent implements OnInit {
  // Users who upvoted the entity.
  users?: User[] = [];

  constructor(
    private corpusService: CorpusService,
    private labelSetService: LabelSetService,
    @Inject(MAT_DIALOG_DATA) public data: UpvotesDialogData
  ) {}

  ngOnInit(): void {
    switch (this.data.element) {
      case 'corpus':
        this.corpusService
          .listUpvotes(this.data.elementId!)
          .subscribe((res) => (this.users = res));
        break;
      case 'label-set':
        this.labelSetService
          .listUpvotes(this.data.elementId!)
          .subscribe((res) => (this.users = res));
        break;
    }
  }
}
