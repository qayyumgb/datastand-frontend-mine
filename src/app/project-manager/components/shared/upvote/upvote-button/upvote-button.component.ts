import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CorpusService, LabelSetService } from '@app/services';
import { UpvotesDialogComponent } from '@pm/components';

@Component({
  selector: 'pm-upvote-button',
  templateUrl: './upvote-button.component.html',
  styleUrls: ['./upvote-button.component.scss'],
})
export class UpvoteButtonComponent {
  @Input() hasUpvoted?: boolean;
  @Input() numUpvotes?: number;
  @Input() elementId?: number;
  @Input() showAsNormal:boolean = false;
  @Input() element?: 'corpus' | 'label' | 'label-set';

  constructor(
    private dialog: MatDialog,
    private labelSetService: LabelSetService,
    private corpusService: CorpusService
  ) {}

  openUpvotesDialogComponent() {
    this.dialog.open(UpvotesDialogComponent, {
      data: { elementId: this.elementId, element: this.element },
    });
  }

  toggleUpvote() {
    switch (this.element) {
      case 'corpus':
        if (this.hasUpvoted) {
          this.corpusService.downvote(this.elementId!).subscribe(() => {
            this.hasUpvoted = false;
            this.numUpvotes! -= 1;
          });
        } else {
          this.corpusService.upvote(this.elementId!).subscribe(() => {
            this.hasUpvoted = true;
            this.numUpvotes! += 1;
          });
        }
        break;
      case 'label-set':
        if (this.hasUpvoted) {
          this.labelSetService.downvote(this.elementId!).subscribe(() => {
            this.hasUpvoted = false;
            this.numUpvotes! -= 1;
          });
        } else {
          this.labelSetService.upvote(this.elementId!).subscribe(() => {
            this.hasUpvoted = true;
            this.numUpvotes! += 1;
          });
        }
        break;
    }
  }
}
