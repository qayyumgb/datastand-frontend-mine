import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '@app/interfaces';

import { TaskService, TextService, UrlsService } from '@app/services';

@Component({
  selector: 'app-items-navigation-panel',
  templateUrl: './items-navigation-panel.component.html',
  styleUrls: ['./items-navigation-panel.component.scss'],
})
export class ItemsNavigationPanelComponent {
  task?: Task;
  taskId?: number;
  taskTextId?: number;
  taskTextIds?: number[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private taskService: TaskService,
    private textService: TextService,
    public urls: UrlsService
  ) {
    this.route.params.subscribe((params) => {
      this.taskId = Number(params['taskId']);
      this.taskTextId = Number(params['taskTextId']);
      this.taskService
        .listTextIds(this.taskId!)
        .subscribe((res) => (this.taskTextIds = res.text_ids));
      this.taskService
        .retrieve(this.taskId!)
        .subscribe((task) => (this.task = task));
    });
  }

  getNextTaskTextId() {
    const index = this.taskTextIds?.indexOf(this.taskTextId!);
    return this.taskTextIds![index! + 1];
  }

  getPreviousTaskTextId() {
    const index = this.taskTextIds?.indexOf(this.taskTextId!);
    return this.taskTextIds![index! - 1];
  }

  hasNextTaskText() {
    const index = this.taskTextIds?.indexOf(this.taskTextId!);
    return index! < this.taskTextIds!.length - 1;
  }

  hasPreviousTaskText() {
    const index = this.taskTextIds?.indexOf(this.taskTextId!);
    return index! > 0;
  }

  navigateToNextTaskText() {
    const nextTaskTextId = this.getNextTaskTextId();
    this.router.navigateByUrl(
      this.urls.getTaskTextUrl(this.taskId!, nextTaskTextId)
    );
  }

  setStatusToPending() {
    this.textService.setStatusToPending(this.taskTextId!).subscribe(() => {
      this.snackBar.open(
        `⚠️ Text ID #${this.taskTextId!} marked as pending`,
        'Dismiss'
      );
      if (this.hasNextTaskText()) {
        this.navigateToNextTaskText();
      }
    });
  }

  setStatusToCompleted() {
    this.textService.setStatusToCompleted(this.taskTextId!).subscribe(() => {
      this.snackBar.open(
        `✅ Text ID #${this.taskTextId!} marked as complete`,
        'Dismiss'
      );
      if (this.hasNextTaskText()) {
        this.navigateToNextTaskText();
      }
    });
  }

  delete() {
    this.textService.delete(this.taskTextId!).subscribe(() => {
      this.snackBar.open(`✅ Text ID #${this.taskTextId!} removed`, 'Dismiss');
      if (this.hasNextTaskText()) {
        this.navigateToNextTaskText();
      } else if (this.hasPreviousTaskText()) {
        this.navigateToPreviousTaskText();
      }
    });
  }

  navigateToPreviousTaskText() {
    const previousTaskTextId = this.getPreviousTaskTextId();
    this.router.navigateByUrl(
      this.urls.getTaskTextUrl(this.taskId!, previousTaskTextId)
    );
  }
}
