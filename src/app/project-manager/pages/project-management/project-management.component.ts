import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatSidenav } from '@angular/material/sidenav';
import { Usage, UserProfile } from '@app/interfaces';
import {
  AuthService,
  ScreenService,
  UrlsService,
  UsageService,
  UserService,
} from '@app/services';
import {
  CreateCorpusDialogComponent,
  CreateLabelSetDialogComponent,
  CreateTaskDialogComponent,
  UsageDialogComponent,
} from '@pm/components';

@Component({
  selector: 'pm-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss'],
})
export class ProjectManagementPage implements OnInit {
  user?: UserProfile;
  usage?: Usage;
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    public screen: ScreenService,
    public urls: UrlsService,
    private usageService: UsageService,
    private userService: UserService
  ) {}

  logout(): void {
    this.auth.logout();
  }

  ngOnInit(): void {
    this.userService.retrieveMe().subscribe((res) => (this.user = res));
    this.usageService.getUsage().subscribe((usage) => {
      this.usage = usage;
    });
  }

  closeMobileSidenav() {
    // isLarge match the breakpoint in the template.
    this.screen.isLarge$.subscribe((match) => {
      if (match) {
        this.sidenav.close();
      }
    });
  }

  openDialog(component: any) {
    this.closeMobileSidenav();
    this.dialog.open(component);
  }

  openCreateCorpusDialog(): void {
    this.openDialog(CreateCorpusDialogComponent);
  }

  openCreateLabelSetDialog(): void {
    this.openDialog(CreateLabelSetDialogComponent);
  }

  openCreateTaskDialog(): void {
    this.openDialog(CreateTaskDialogComponent);
  }

  openUsageDialogComponent(): void {
    this.openDialog(UsageDialogComponent);
  }

  toggleMenu() {
    this.sidenav.toggle();
  }
}
