import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Corpus, Text } from '@app/interfaces';
import { TextService } from '@app/services';

@Component({
  selector: 'pm-create-text-dialog',
  templateUrl: './create-text-dialog.component.html',
  styleUrls: [],
})
export class CreateTextDialogComponent {
  @ViewChild('content', { read: ElementRef }) public content?: ElementRef<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Corpus,
    private dialogRef: MatDialogRef<CreateTextDialogComponent>,
    private snackbar: MatSnackBar,
    private textService: TextService
  ) {}

  onSubmit(text: Partial<Text>): void {
    this.textService
      .create({ ...text, content_type: 'corpus', object_id: this.data.id })
      .subscribe(() => {
        this.dialogRef.close(true);
        this.snackbar.open('✅ Text created successfully', 'Dismiss');
      });
  }
}
