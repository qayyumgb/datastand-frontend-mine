import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreateCorpusDialogComponent } from '@pm/components';

@Component({
  selector: 'pm-public-corpus-list-header-card',
  templateUrl: './public-corpus-list-header-card.component.html',
})
export class PublicCorpusListHeaderCardComponent {
  constructor(private dialog: MatDialog) {}

  openCreateCorpusDialog() {
    this.dialog.open(CreateCorpusDialogComponent, {});
  }
}
