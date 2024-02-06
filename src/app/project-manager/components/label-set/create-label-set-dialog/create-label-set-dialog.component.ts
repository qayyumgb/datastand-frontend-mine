import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LabelSet } from '@app/interfaces';
import { LabelSetService, UrlsService } from '@app/services';

@Component({
  selector: 'pm-create-label-set-dialog',
  templateUrl: './create-label-set-dialog.component.html',
  styleUrls: [],
})
export class CreateLabelSetDialogComponent {
  constructor(
    private labelSetService: LabelSetService,
    private router: Router,
    private urls: UrlsService
  ) {}

  onSubmit(labelSet: Partial<LabelSet>): void {
    this.labelSetService
      .create(labelSet)
      .subscribe((res) =>
        this.router.navigateByUrl(this.urls.getLabelSetUrl(res.id))
      );
  }
}
