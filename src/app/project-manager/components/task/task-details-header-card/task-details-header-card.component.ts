import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Task } from '@app/interfaces';
import { AuthService, TaskService, UrlsService } from '@app/services';
import { UpdateTaskDialogComponent } from '@pm/components';

@Component({
  selector: 'pm-task-details-header-card',
  templateUrl: './task-details-header-card.component.html',
  styleUrls: ['../../change-image-button.scss'],
})
export class TaskDetailsHeaderCardComponent implements OnInit {
  @Input() task?: Task;
  isCreator?: boolean;

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private taskService: TaskService,
    public urls: UrlsService
  ) {}

  ngOnInit(): void {
    this.isCreator = this.task?.creator?.username === this.auth.username;
  }

  changeImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const image: File = event.target.files[0];
      this.taskService
        .patchImage(this.task?.id!, image)
        .subscribe((res) => (this.task = res));
    }
  }

  deleteTask() {
    this.taskService
      .delete(this.task?.id!)
      .subscribe(() => this.router.navigateByUrl(this.urls.CORPORA_URL));
  }

  forkTask() {
    // this.ds.forkTask(this.task?.id!).subscribe({
    //   next: (res: Task) => {
    //     this.router.navigateByUrl(urls.getTaskUrl(res.id));
    //   },
    //
    //   complete: () =>
    //     this.snackBar.open('✅ Task forked succesfully', 'Dismiss'),
    // });
  }

  openUpdateTaskDialog() {
    this.dialog.open(UpdateTaskDialogComponent, {
      data: this.task,
    });
  }
}
