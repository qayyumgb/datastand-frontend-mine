import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Mixin } from 'ts-mixer';

import { Label, LabelSet } from '@app/interfaces';
import { LoadingStatusMixin, PaginatedItemListMixin } from '@app/mixins';
import {
  AuthService,
  LabelFilters,
  LabelService,
  LabelSetService,
} from '@app/services';
import {
  CreateLabelDialogComponent,
  LabelSetEditLabelsDialogComponent,
} from '@pm/components';
import { isCreator } from '@pm/utils';

@Component({
  selector: 'pm-label-ul-card',
  templateUrl: './label-ul-card.component.html',
  styleUrls: [
    '../../../pages/base-items-section.scss',
    '../../../pages/base-list-page.scss',
    '../../change-image-button.scss',
  ],
})
export class LabelUlCardComponent
  extends Mixin(LoadingStatusMixin, PaginatedItemListMixin)
  implements OnDestroy, OnInit
{
  @Input() labelSet?: LabelSet;
  labelSetId?: number;
  isCreator?: boolean;
  routeSubscription: Subscription;
  filters: LabelFilters = { ordering: '-modified' };
  // Paginator data
  page?: number;

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private labelService: LabelService,
    private labelSetService: LabelSetService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    super();
    this.startLoading();
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.labelSetId = Number(params['labelSetId']);

      this.route.queryParamMap.subscribe((params) => {
        this.filters = {
          creator: params.get('creator')!,
          is_pending: params.get('is_pending')!,
          is_public: params.get('is_public')!,
          page: params.get('page')! || 1,
          modifiedLast: params.get('modifiedLast')!,
          ordering: params.get('ordering')!,
          search: params.get('search')!,
          tag: params.get('tag')!,
        };
        this.getLabels(this.filters);
      });
    });
  }

  get labels$(): Observable<Label[]> {
    return <Observable<Label[]>>this.items$;
  }

  acceptAllLabels() {
    this.labelSetService
      .acceptAllLabels(this.labelSet?.id!)
      .subscribe((res) => {
        this.snackBar.open(
          `✅ ${res.num_changed} suggestion(s) accepted`,
          'Dismiss'
        );
        this.getLabels(this.filters);
      });
  }

  copyLabel(labelId: number) {
    this.labelService
      .copy(labelId)
      .subscribe((res: Label) => this.addItemAboveId(res, labelId));
  }

  deleteLabel(labelId: number) {
    this.labelService
      .delete(labelId)
      .subscribe(() => this.deleteItemById(labelId));
  }

  importLabelsFromCsv(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.labelSetService
        .importLabelsFromCsv(this.labelSet?.id!, file)
        .subscribe((res) => {
          this.snackBar.open(`✅ ${res.length} labels imported`, 'Dismiss');
          this.resetLabels();
        });
    }
  }

  dedupeLabels() {
    this.labelSetService.dedupeLabels(this.labelSet?.id!).subscribe((res) => {
      if (res.num_deleted == 0) {
        this.snackBar.open(`✅ No duplicates found`, 'Dismiss');
      } else {
        this.snackBar.open(
          `✅ ${res.num_deleted} duplicates removed`,
          'Dismiss'
        );
      }
      this.resetLabels();
    });
  }

  deleteAllLabels() {
    this.labelSetService
      .deleteAllLabels(this.labelSet?.id!)
      .subscribe((res) => {
        const num_deleted = res.num_deleted;
        this.snackBar.open(`✅ ${num_deleted} labels removed`, 'Dismiss');
        this.deleteAllItems();
      });
  }

  getLabels(filters: LabelFilters): void {
    this.labelService
      .listFromLabelSet(this.labelSetId!, filters)
      .subscribe((res) => {
        this.setItems(res.results);
        this.setTotalCount(res.count);
        this.page = Number(filters.page!);
        this.stopLoading();
      });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.isCreator = isCreator(this.labelSet!, this.auth.user?.username);
  }

  openLabelSetEditLabelsDialog() {
    let dialogRef = this.dialog.open(LabelSetEditLabelsDialogComponent, {
      data: this.labelSet,
    });
    // dialogRef returns a boolean indicating if the dialog was saved.
    dialogRef
      .afterClosed()
      .subscribe((isSaved: boolean) => isSaved && this.resetLabels());
  }

  openCreateLabelDialog(): void {
    let dialogRef = this.dialog.open(CreateLabelDialogComponent, {
      data: this.labelSet!,
    });
    // dialogRef returns a boolean indicating if the dialog was saved.
    dialogRef
      .afterClosed()
      .subscribe((isSaved: boolean) => isSaved && this.resetLabels());
  }

  resetLabels(): void {
    this.filters = { page: 1 };
    this.getLabels(this.filters);
  }

  setLabelStatusToPending(labelId: number) {
    this.labelService
      .setStatusToPending(labelId)
      .subscribe((res: Label) => this.overwriteItem(res));
  }

  setLabelStatusToReviewed(labelId: number) {
    this.labelService
      .setStatusToReviewed(labelId)
      .subscribe((res: Label) => this.overwriteItem(res));
  }
}
