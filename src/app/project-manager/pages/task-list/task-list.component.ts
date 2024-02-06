import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mixin } from 'ts-mixer';

import { Task } from '@app/interfaces';
import { LoadingStatusMixin, PaginatedItemListMixin } from '@app/mixins';
import { TaskFilters, TaskService, UserSettingsService } from '@app/services';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
})
export class TaskListPage
  extends Mixin(LoadingStatusMixin, PaginatedItemListMixin)
  implements OnInit
{
  filters: TaskFilters = { ordering: '-modified' };
  page?: number;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    public userSettings: UserSettingsService
  ) {
    super();
  }

  override get items(): Task[] {
    return <Task[]>this._items;
  }

  getTasks() {
    this.startLoading();
    this.taskService.listByMe(this.filters).subscribe((res) => {
      this.setItems(res.results);
      this.setTotalCount(res.count);
      this.page = Number(this.filters?.page!);
      this.stopLoading();
    });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.filters = {
        creator: params.get('creator')!,
        langtag: params.get('langtag')!,
        page: params.get('page')! || 1,
        modifiedLast: params.get('modifiedLast')!,
        ordering: params.get('ordering')!,
        search: params.get('search')!,
        tag: params.get('tag')!,
      };
      this.getTasks();
    });
  }
}
