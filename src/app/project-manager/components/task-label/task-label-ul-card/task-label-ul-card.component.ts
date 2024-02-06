import { Component, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Mixin } from 'ts-mixer';

import { Label, Task } from '@app/interfaces';
import { LoadingStatusMixin, PaginatedItemListMixin } from '@app/mixins';
import {
  AuthService,
  LabelFilters,
  LabelService,
  TaskService,
  UrlsService,
} from '@app/services';
import {
  CreateTaskLabelDialogComponent,
  TaskEditTaskLabelsDialogComponent,
} from '@pm/components';

@Component({
  selector: 'pm-task-label-ul-card',
  templateUrl: './task-label-ul-card.component.html',
  styleUrls: [
    '../../../pages/base-items-section.scss',
    '../../../pages/base-list-page.scss',
    '../../change-image-button.scss',
  ],
})
export class TaskLabelUlCardComponent
  extends Mixin(LoadingStatusMixin, PaginatedItemListMixin)
  implements OnDestroy
{
  searchForm = this.fb.group({
    search: ['', []],
  });
  task?: Task;
  taskId?: number;
  isCreator?: boolean;
  routeSubscription?: Subscription;
  filters: LabelFilters = { ordering: '-modified' };
  // Paginator data
  page?: number;

  override get items(): Label[] {
    return <Label[]>this._items;
  }

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private taskService: TaskService,
    private labelService: LabelService,
    public urls: UrlsService
  ) {
    super();
    this.startLoading();
    // This is a nested route, so we need to subscribe to the parent's parent params.
    //  - /pm/tasks/9/labels/<empty> (route)
    //  - /pm/tasks/9/labels (parent)
    //  - /pm/tasks/9 (parent.parent)
    if (this.route.parent && this.route.parent.parent) {
      this.routeSubscription = this.route.parent.parent.params.subscribe(
        (params) => {
          this.taskId = Number(params['taskId']);
          this.getTask();

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
            this.getTaskLabels(this.filters);
          });
        }
      );
    }
  }

  acceptAllLabels() {
    this.taskService.acceptAllLabels(this.task?.id!).subscribe((res) => {
      this.snackBar.open(
        `✅ ${res.num_changed} suggestion(s) accepted`,
        'Dismiss'
      );
      this.getTaskLabels(this.filters);
    });
  }

  dedupeTaskLabels() {
    this.taskService.dedupeLabels(this.task?.id!).subscribe((res) => {
      if (res.num_deleted == 0) {
        this.snackBar.open(`✅ No duplicates found`, 'Dismiss');
      } else {
        this.snackBar.open(
          `✅ ${res.num_deleted} duplicates removed`,
          'Dismiss'
        );
      }
      this.resetTaskLabels();
    });
  }

  deleteAllTaskLabels() {
    this.taskService.deleteAllLabels(this.task?.id!).subscribe((res) => {
      const num_deleted = res.num_deleted;
      this.snackBar.open(`✅ ${num_deleted} labels removed`, 'Dismiss');
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

  getTaskLabels(filters: LabelFilters): void {
    this.labelService.listFromTask(this.taskId!, filters).subscribe((res) => {
      this.setItems(res.results);
      this.setTotalCount(res.count);
      // Paginator info
      // TODO(gustavoauma): Refactor this and make it more general.
      this.page = Number(filters.page!);
      this.stopLoading();
    });
  }

  hasFilters() {
    return (
      this.filters.is_pending ||
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
      this.getTaskLabels(this.filters);
    }
  }

  openTaskEditTaskLabelsDialog() {
    let dialogRef = this.dialog.open(TaskEditTaskLabelsDialogComponent, {
      data: this.task,
    });
    // dialogRef returns a boolean indicating if the dialog was saved.
    dialogRef
      .afterClosed()
      .subscribe((isSaved: boolean) => isSaved && this.resetTaskLabels());
  }

  openCreateTaskLabelDialog(): void {
    let dialogRef = this.dialog.open(CreateTaskLabelDialogComponent, {
      data: this.task!,
    });
    // dialogRef returns a boolean indicating if the dialog was saved.
    dialogRef
      .afterClosed()
      .subscribe((isSaved: boolean) => isSaved && this.resetTaskLabels());
  }

  openGenerateTaskLabelsDialog(): void {
    // let dialogRef = this.dialog.open(GenerateTaskLabelsDialogComponent, {});
    // // dialogRef returns the number of taskLabels to be generated.
    // dialogRef.afterClosed().subscribe((numTaskLabels: number) => {
    //   if (numTaskLabels) {
    //     this.corporaGenerateTaskLabels(numTaskLabels);
    //   }
    // });
  }

  resetTaskLabels(): void {
    this.updateFilters({});
    this.getTaskLabels(this.filters);
  }

  resetSearch(): void {
    this.searchForm.reset();
    this.filters = { ...this.filters, search: '' };
    this.resetTaskLabels();
  }

  updateFilters(filters: LabelFilters) {
    this.filters = { ...filters, page: 1 };
    // Update the URL without navigating.
    // https://stackoverflow.com/questions/43698032/
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { ...this.filters },
    });
  }

  updateFiltersAndTaskLabels(filters: LabelFilters) {
    this.updateFilters(filters);
    this.getTaskLabels(this.filters);
  }

  updatePaginatorAndTaskLabels(page: number) {
    this.filters.page = page;
    // Update the URL without navigating.
    // https://stackoverflow.com/questions/43698032/
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { ...this.filters, page },
    });
    this.getTaskLabels(this.filters);
  }
}
