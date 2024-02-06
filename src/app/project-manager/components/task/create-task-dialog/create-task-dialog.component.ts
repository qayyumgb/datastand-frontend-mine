import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Task } from '@app/interfaces';
import { TaskService, UrlsService } from '@app/services';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: [],
})
export class CreateTaskDialogComponent {
  constructor(
    private router: Router,
    private taskService: TaskService,
    private urls: UrlsService
  ) {}

  onSubmit(corpus: Partial<Task>): void {
    this.taskService.create(corpus).subscribe((res) => {
      this.router.navigateByUrl(this.urls.getTaskUrl(res.id));
    });
  }
}
