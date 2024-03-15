import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Mixin } from 'ts-mixer';

import { Corpus, Text } from '@app/interfaces';
import {
  LoadingStatusMixin,
  PaginatedItemListWithMultiSelectionMixin,
} from '@app/mixins';
import {
  AuthService,
  CorpusService,
  TextFilters,
  TextService,
} from '@app/services';
import {
  CorpusEditTextsDialogComponent,
  CreateTextDialogComponent,
  GenerateTextsDialogComponent,
} from '@pm/components';

@Component({
  selector: 'pm-text-ul-card',
  templateUrl: './text-ul-card.component.html',
  styleUrls: [
    '../../../pages/base-items-section.scss',
    '../../../pages/base-list-page.scss',
    '../../change-image-button.scss',
  ],
})
export class TextUlCardComponent
  extends Mixin(LoadingStatusMixin, PaginatedItemListWithMultiSelectionMixin)
  implements OnDestroy, OnInit
{
  // Corpus is passed as input to avoid making an extra request.
  @Input() corpus?: Corpus;
  corpusId?: number;
  isCreator?: boolean;
  routeSubscription: Subscription;
  filters: TextFilters = { ordering: '-modified' };
  // Paginator data
  page?: number;

  constructor(
    private auth: AuthService,
    private corpusService: CorpusService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private textService: TextService
  ) {
    super();
    this.startLoading();
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.corpusId = Number(params['corpusId']);

      this.route.queryParamMap.subscribe((params) => {
        this.filters = {
          creator: params.get('creator')!,
          is_pending: params.get('is_pending')!,
          is_public: params.get('is_public')!,
          is_seed: params.get('is_seed')!,
          langtag: params.get('langtag')!,
          page: params.get('page')! || 1,
          modifiedLast: params.get('modifiedLast')!,
          ordering: params.get('ordering')!,
          search: params.get('search')!,
          status: params.get('status')!,
          tag: params.get('tag')!,
        };
        this.getTexts();
      });
    });
  }

  get texts$(): Observable<Text[]> {
    return <Observable<Text[]>>this.items$;
  }

  copyText(textId: number) {
    this.textService
      .copy(textId)
      .subscribe((res: Text) => this.addItemAboveId(res, textId));
  }

  corporaAcceptAllSuggestions() {
    this.corpusService
      .acceptAllSuggestions(this.corpus?.id!)
      .subscribe((res) => {
        this.snackBar.open(
          `✅ ${res.num_changed} suggestion(s) accepted`,
          'Dismiss'
        );
        this.getTexts();
      });
  }

  dedupeTexts() {
    this.corpusService.dedupeTexts(this.corpus?.id!).subscribe((res) => {
      if (res.num_deleted == 0) {
        this.snackBar.open(`✅ No duplicate texts found`, 'Dismiss');
      } else {
        this.snackBar.open(
          `✅ ${res.num_deleted} duplicate texts removed`,
          'Dismiss'
        );
      }
      this.resetTexts();
    });
  }

  deleteText(textId: number) {
    this.textService
      .delete(textId)
      .subscribe(() => this.deleteItemById(textId));
  }

  deleteTexts(corpusId: number, textIds: number[]) {
    this.corpusService.deleteTexts(corpusId, textIds).subscribe(() => {
      this.resetTexts();
      this.clearSelection();
    });
  }

  deleteAllTexts() {
    this.corpusService.deleteAllTexts(this.corpus?.id!).subscribe((res) => {
      this.snackBar.open(`✅ ${res.num_deleted} texts removed`, 'Dismiss');
      this.deleteAllItems();
    });
  }

  getTexts(): void {
    this.textService
      .listFromCorpus(this.corpusId!, this.filters)
      .subscribe((res) => {
        this.setItems(res.results);
        this.setTotalCount(res.count);
        // Paginator info
        this.page = Number(this.filters.page!);
        this.stopLoading();
      });
  }

  ngOnInit(): void {
    this.isCreator =
      this.corpus?.creator?.username === this.auth.user?.username;
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  openCorpusEditTextsDialog() {
    let dialogRef = this.dialog.open(CorpusEditTextsDialogComponent, {
      data: this.corpus,
    });
    // dialogRef returns a boolean indicating if the dialog was saved.
    dialogRef
      .afterClosed()
      .subscribe((isSaved: boolean) => isSaved && this.resetTexts());
  }

  openCreateTextDialog(): void {
    let dialogRef = this.dialog.open(CreateTextDialogComponent, {
      data: this.corpus!,
    });
    // dialogRef returns a boolean indicating if the dialog was saved.
    dialogRef
      .afterClosed()
      .subscribe((isSaved: boolean) => isSaved && this.resetTexts());
  }

  openGenerateTextsDialog(): void {
    let dialogRef = this.dialog.open(GenerateTextsDialogComponent, {
      data: { entityId: this.corpus?.id!, entityType: 'corpus' },
    });
    // Texts are generated in the dialog, so we just need to reset the texts.
    dialogRef.afterClosed().subscribe(() => this.resetTexts());
  }

  resetTexts(): void {
    this.filters = { page: 1 };
    this.getTexts();
  }

  setTextAsNotSeed(textId: number) {
    this.textService
      .setAsNotSeed(textId)
      .subscribe((res: Text) => this.overwriteItem(res));
  }

  setTextAsSeed(textId: number) {
    this.textService
      .setAsSeed(textId)
      .subscribe((res: Text) => this.overwriteItem(res));
  }

  setTextStatusToPending(textId: number) {
    this.textService
      .setStatusToPending(textId)
      .subscribe((res: Text) => this.overwriteItem(res));
  }

  setTextStatusToReviewed(textId: number) {
    this.textService
      .setStatusToReviewed(textId)
      .subscribe((res: Text) => this.overwriteItem(res));
  }

  setTextsAsSeeds(corpusId: number, textIds: number[]) {
    this.corpusService.setTextsAsSeeds(corpusId, textIds).subscribe(() => {
      this.resetTexts();
      this.clearSelection();
    });
  }

  setTextsAsNotSeeds(corpusId: number, textIds: number[]) {
    this.corpusService.setTextsAsNotSeeds(corpusId, textIds).subscribe(() => {
      this.resetTexts();
      this.clearSelection();
    });
  }

  setTextsStatusToPending(corpusId: number, textIds: number[]) {
    this.corpusService
      .setTextsStatusToPending(corpusId, textIds)
      .subscribe(() => {
        this.resetTexts();
        this.clearSelection();
      });
  }

  setTextsStatusToReviewed(corpusId: number, textIds: number[]) {
    this.corpusService
      .setTextsStatusToReviewed(corpusId, textIds)
      .subscribe(() => {
        this.resetTexts();
        this.clearSelection();
      });
  }
}
