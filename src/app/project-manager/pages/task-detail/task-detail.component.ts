import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Task } from '@app/interfaces';
import { TaskService, UrlsService } from '@app/services';

@Component({
  selector: 'pm-task-detail',
  templateUrl: './task-detail.component.html',
})
export class TaskDetailPage implements OnDestroy {
  task?: Task;
  routeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    public urls: UrlsService
  ) {
    this.routeSubscription = this.route.params.subscribe((params) => {
      const taskId = Number(params['taskId']);
      this.taskService.retrieve(taskId).subscribe((task) => (this.task = task));
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
