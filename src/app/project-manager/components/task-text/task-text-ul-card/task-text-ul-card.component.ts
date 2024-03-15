import { Component, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Mixin } from 'ts-mixer';

import { Task, Text } from '@app/interfaces';
import {
  LoadingStatusMixin,
  PaginatedItemListWithMultiSelectionMixin,
} from '@app/mixins';
import {
  AuthService,
  TaskService,
  TextFilters,
  TextService,
  UrlsService,
} from '@app/services';
import {
  AddTokenLayersDialogComponent,
  CreateTaskTextDialogComponent,
  GenerateTextsDialogComponent,
  TaskEditTaskTextsDialogComponent,
} from '@pm/components';
@Component({
  selector: 'pm-task-text-ul-card',
  templateUrl: './task-text-ul-card.component.html',
  styleUrls: [
    '../../../pages/base-items-section.scss',
    '../../../pages/base-list-page.scss',
    '../../change-image-button.scss',
  ],
})
export class TaskTextUlCardComponent
  extends Mixin(LoadingStatusMixin, PaginatedItemListWithMultiSelectionMixin)
  implements OnDestroy
{
  searchForm = this.fb.group({
    search: ['', []],
  });
  task?: Task;
  taskId?: number;
  isCreator?: boolean;
  routeSubscription?: Subscription;
  filters: TextFilters = { ordering: '-modified' };
  // Paginator data
  page?: number;

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private taskService: TaskService,
    private textService: TextService,
    public urls: UrlsService
  ) {
    super();
    this.startLoading();
    // This is a nested route, so we need to subscribe to the parent's parent params.
    //  - /pm/tasks/9/texts/<empty> (route)
    //  - /pm/tasks/9/texts (parent)
    //  - /pm/tasks/9 (parent.parent)
    if (this.route.parent && this.route.parent.parent) {
      this.routeSubscription = this.route.parent.parent.params.subscribe(
        (params) => {
          this.taskId = Number(params['taskId']);
          this.getTask();

          this.route.queryParamMap.subscribe((params) => {
            this.filters = {
              creator: params.get('creator')!,
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
            this.getTaskTexts(this.filters);
          });
        }
      );
    }
  }

  get texts$(): Observable<Text[]> {
    return <Observable<Text[]>>this.items$;
  }

  acceptAllSuggestions() {
    this.taskService.acceptAllSuggestions(this.task?.id!).subscribe((res) => {
      this.snackBar.open(
        `✅ ${res.num_changed} suggestion(s) accepted`,
        'Dismiss'
      );
      this.getTaskTexts(this.filters);
    });
  }

  copyText(textId: number) {
    this.textService
      .copy(textId)
      .subscribe((res: Text) => this.addItemAboveId(res, textId));
  }

  deleteText(textId: number) {
    this.textService
      .delete(textId)
      .subscribe(() => this.deleteItemById(textId));
  }

  generateTexts(numTexts: number) {
    let numGeneratedTexts = 0; // Counter for generated texts

    this.taskService.generateTexts(this.task?.id!, numTexts).subscribe({
      next: (res: Text) => {
        numGeneratedTexts++;
        this.snackBar.open(
          `🤖 Generating texts... (${numGeneratedTexts}/${numTexts})`,
          'Dismiss',
          { duration: 600_000 }
        );
        this.setItems([res, ...this.items!]);
        this._increaseCounts();
      },
      complete: () =>
        this.snackBar.open(
          `✅ ${numGeneratedTexts} Text(s) generated successfully`,
          'Dismiss'
        ),
    });
  }

  dedupeTaskTexts() {
    this.taskService.dedupeTexts(this.task?.id!).subscribe((res) => {
      if (res.num_deleted == 0) {
        this.snackBar.open(`✅ No duplicate texts found`, 'Dismiss');
      } else {
        this.snackBar.open(
          `✅ ${res.num_deleted} duplicate texts removed`,
          'Dismiss'
        );
      }
      this.resetTaskTexts();
    });
  }

  deleteTaskTexts(taskId: number, textIds: number[]) {
    this.taskService.deleteTexts(taskId, textIds).subscribe(() => {
      this.resetTaskTexts();
      this.clearSelection();
    });
  }

  deleteAllTaskTexts() {
    this.taskService.deleteAllTexts(this.task?.id!).subscribe((res) => {
      const num_deleted = res.num_deleted;
      this.snackBar.open(`✅ ${num_deleted} Texts removed`, 'Dismiss');
      this.deleteAllItems();
    });
  }

  getTask(): void {
    this.taskService.retrieve(this.taskId!).subscribe((task) => {
      this.task = task;
      this.isCreator =
        this.task?.creator?.username === this.auth.user?.username;
    });
  }

  getTaskTexts(filters: TextFilters): void {
    this.textService.listFromTask(this.taskId!, filters).subscribe((res) => {
      this.setItems(res.results);
      this.setTotalCount(res.count);
      this.page = Number(filters.page!);
      this.stopLoading();
    });
  }

  hasFilters() {
    return (
      this.filters.status ||
      this.filters.langtag ||
      this.filters.modifiedLast ||
      this.filters.search ||
      this.filters.tag
    );
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  onSearchKeyUp(): void {
    if (this.searchForm.valid) {
      this.filters = { ...this.filters, search: this.searchForm.value.search! };
      this.getTaskTexts(this.filters);
    }
  }

  openAddTokenLayersDialog() {
    this.dialog.open(AddTokenLayersDialogComponent, { data: this.task?.id });
  }

  openTaskEditTaskTextsDialog() {
    let dialogRef = this.dialog.open(TaskEditTaskTextsDialogComponent, {
      data: this.task,
    });
    // dialogRef returns a boolean indicating if the dialog was saved.
    dialogRef
      .afterClosed()
      .subscribe((isSaved: boolean) => isSaved && this.resetTaskTexts());
  }

  openCreateTaskTextDialog(): void {
    let dialogRef = this.dialog.open(CreateTaskTextDialogComponent, {
      data: this.task!,
    });
    // dialogRef returns a boolean indicating if the dialog was saved.
    dialogRef
      .afterClosed()
      .subscribe((isSaved: boolean) => isSaved && this.resetTaskTexts());
  }

  openGenerateTaskTextsDialog(): void {
    let dialogRef = this.dialog.open(GenerateTextsDialogComponent, {
      data: { entityId: this.task?.id!, entityType: 'task' },
    });
    // Texts are generated in the dialog, so we just need to reset the texts.
    dialogRef.afterClosed().subscribe(() => this.resetTaskTexts());
  }

  resetTaskTexts(): void {
    this.filters = { page: 1 };
    this.getTaskTexts(this.filters);
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

  setTextStatusToCompleted(textId: number) {
    this.textService
      .setStatusToCompleted(textId)
      .subscribe((res: Text) => this.overwriteItem(res));
  }

  setTextStatusToPending(textId: number) {
    this.textService
      .setStatusToPending(textId)
      .subscribe((res: Text) => this.overwriteItem(res));
  }

  setTextsAsSeeds(taskId: number, textIds: number[]) {
    this.taskService.setTextsAsSeeds(taskId, textIds).subscribe(() => {
      this.resetTaskTexts();
      this.clearSelection();
    });
  }

  setTextsAsNotSeeds(taskId: number, textIds: number[]) {
    this.taskService.setTextsAsNotSeeds(taskId, textIds).subscribe(() => {
      this.resetTaskTexts();
      this.clearSelection();
    });
  }

  setTextsStatusToPending(taskId: number, textIds: number[]) {
    this.taskService.setTextsStatusToPending(taskId, textIds).subscribe(() => {
      this.resetTaskTexts();
      this.clearSelection();
    });
  }

  setTextsStatusToReviewed(taskId: number, textIds: number[]) {
    this.taskService.setTextsStatusToReviewed(taskId, textIds).subscribe(() => {
      this.resetTaskTexts();
      this.clearSelection();
    });
  }
}
