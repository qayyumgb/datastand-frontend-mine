import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Mixin } from 'ts-mixer';

import { Text } from '@app/interfaces';
import { ItemsListMixin } from '@app/mixins';
import { CorpusService, TaskService } from '@app/services';
import { LoadStatus } from '@app/workbench/enums';

export interface GenerateTextsDialogData {
  entityId: number;
  entityType: 'corpus' | 'task';
}

@Component({
  selector: 'app-generate-texts-dialog',
  templateUrl: './generate-texts-dialog.component.html',
  styleUrls: ['./generate-texts-dialog.component.scss'],
})
export class GenerateTextsDialogComponent
  extends Mixin(ItemsListMixin)
  implements OnDestroy
{
  form = this.fb.group({
    numTexts: [10, [Validators.required]],
  });
  generationLoadStatus: LoadStatus = LoadStatus.Pending;
  loadStatus = LoadStatus; // Needed in the template.
  private subscription: Subscription | undefined;

  override get items(): Text[] {
    return <Text[]>this._items;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: GenerateTextsDialogData,
    private corpusService: CorpusService,
    private taskService: TaskService,
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  generateTexts(numTexts: number): void {
    this.generationLoadStatus = LoadStatus.Loading;

    // Define the service to be called based on the entity type.
    var service: CorpusService | TaskService;
    switch (this.data.entityType) {
      case 'corpus':
        service = this.corpusService;
        break;
      case 'task':
        service = this.taskService;
        break;
    }

    this.subscription = service
      .generateTexts(this.data.entityId!, numTexts)
      .subscribe({
        error: (err) => console.log(err),
        next: (res: Text) => this.setItems([...this.items!, res]),
        complete: () => (this.generationLoadStatus = LoadStatus.Success),
      });
  }
}
