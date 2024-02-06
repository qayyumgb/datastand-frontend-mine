import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreateCorpusDialogComponent } from '@pm/components';

@Component({
  selector: 'pm-my-corpus-list-header-card',
  templateUrl: './my-corpus-list-header-card.component.html',
})
export class MyCorpusListHeaderCardComponent {
  constructor(private dialog: MatDialog) {}

  openCreateCorpusDialog() {
    this.dialog.open(CreateCorpusDialogComponent, {});
  }
}
