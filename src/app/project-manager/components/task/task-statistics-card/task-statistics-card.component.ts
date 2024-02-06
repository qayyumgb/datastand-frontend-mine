import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mixin } from 'ts-mixer';

import { NGX_COLOR_SCHEME } from '@app/constants';
import { LoadingStatusMixin, PaginatedItemListMixin } from '@app/mixins';
import { TaskService, TextService, UrlsService } from '@app/services';

@Component({
  selector: 'app-task-statistics-card',
  templateUrl: './task-statistics-card.component.html',
  styleUrls: ['./task-statistics-card.component.scss'],
})
export class TaskStatisticsCardComponent extends Mixin(
  LoadingStatusMixin,
  PaginatedItemListMixin
) {
  stats?: any;
  taskId?: number;
  colorScheme = NGX_COLOR_SCHEME;

  constructor(
    private taskService: TaskService,
    private textService: TextService,
    private route: ActivatedRoute,
    public urls: UrlsService
  ) {
    super();
    this.startLoading();
    // This is a nested route, so we need to subscribe to the parent's parent params.
    //  - /pm/tasks/9/statistics/<empty> (route)
    //  - /pm/tasks/9/statistics (parent)
    //  - /pm/tasks/9 (parent.parent)
    if (this.route.parent && this.route.parent.parent) {
      this.route.parent.parent.params.subscribe((params) => {
        this.taskId = Number(params['taskId']);
        this.getStats(this.taskId);
      });
    }
  }

  deleteTaskText(taskTextId: number): void {
    this.textService
      .delete(taskTextId)
      .subscribe(() => this.getStats(this.taskId!));
  }

  getStats(taskId: number): void {
    this.taskService.stats(taskId).subscribe((stats) => {
      this.stats = stats;
      this.stopLoading();
    });
  }
}
