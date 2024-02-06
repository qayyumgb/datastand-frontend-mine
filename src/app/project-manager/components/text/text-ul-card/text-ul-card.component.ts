import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Mixin } from 'ts-mixer';

import { Corpus, Text } from '@app/interfaces';
import { LoadingStatusMixin, PaginatedItemListMixin } from '@app/mixins';
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
  extends Mixin(LoadingStatusMixin, PaginatedItemListMixin)
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
          langtag: params.get('langtag')!,
          page: params.get('page')! || 1,
          modifiedLast: params.get('modifiedLast')!,
          ordering: params.get('ordering')!,
          search: params.get('search')!,
          tag: params.get('tag')!,
        };
        this.getTexts();
      });
    });
  }

  override get items(): Text[] {
    return <Text[]>this._items;
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

  corporaGenerateTexts(numTexts: number) {
    var isSnackBarOpen = false;
    this.corpusService.generateTexts(this.corpus?.id!, numTexts).subscribe({
      next: (res: Text) => {
        if (!isSnackBarOpen) {
          this.snackBar.open(
            `🤖 Generating texts in the background...`,
            'Dismiss',
            { duration: 60_000 }
          );
          isSnackBarOpen = true;
        }
        this.setItems([res, ...this.items!]);
        this._increaseCounts();
      },
      error: (err: Error) => console.error('Observer got an error: ' + err),
      complete: () =>
        this.snackBar.open('✅ Texts generated successfully', 'Dismiss'),
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
    let dialogRef = this.dialog.open(GenerateTextsDialogComponent, {});
    // dialogRef returns the number of texts to be generated.
    dialogRef
      .afterClosed()
      .subscribe(
        (numTexts: number) => numTexts && this.corporaGenerateTexts(numTexts)
      );
  }

  resetTexts(): void {
    this.filters = { page: 1 };
    this.getTexts();
  }
}
