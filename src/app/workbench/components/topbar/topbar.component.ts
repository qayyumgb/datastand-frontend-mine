import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

import { AuthService, UrlsService } from '@app/services';
import { StoreService } from '@workbench/services';
import * as utils from '@workbench/utils';

import {
  AboutDialogComponent,
  AnnotationCountDialogComponent,
  ByteCountDialogComponent,
  ClearAllAnnotationsDialogComponent,
  ClearAllTokensDialogComponent,
  CreateCommentDialogComponent,
  CreateLabelDialogComponent,
  CreateTokenLayerDialogComponent,
  FileDetailsDialogComponent,
  HelpDialogComponent,
  KeyboardShortcutsDialogComponent,
  PrivacyPolicyDialogComponent,
  ProfileDialogComponent,
  ResetTextDialogComponent,
  SendFeedbackDialogComponent,
  TermsOfUseDialogComponent,
  TokenCountDialogComponent,
  UpdateCommentDialogComponent,
  UpdateLabelDialogComponent,
  UpdateNameDialogComponent,
  UpdateTokenLayerDialogComponent,
} from '@workbench/components';
import {
  clearTask,
  clearTextBody,
  closeAllWindows,
  removeComment,
  removeLabel,
  removeTokenLayer,
  resetWindows,
  toggleCommentsWindow,
  toggleLabelSetWindow,
  toggleSuggestionsWindow,
  toggleTokenLayersWindow,
  toggleTokenizersWindow,
  uploadTextBody,
} from './topbar.actions';
import { selectTopbarConditionsVM, selectTopbarVM } from './topbar.selectors';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss', '../context-menu.scss'],
})
export class TopbarComponent {
  vm$ = this.store.select(selectTopbarVM);
  cvm$ = this.store.select(selectTopbarConditionsVM);
  user = this.auth.user;
  taskTextId?: number;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private ss: StoreService,
    private store: Store,
    private auth: AuthService,
    public urls: UrlsService
  ) {
    this.taskTextId = Number(this.route.snapshot.paramMap.get('taskTextId')!);
  }

  clearTask() {
    this.store.dispatch(clearTask());
  }

  clearText() {
    this.store.dispatch(clearTextBody());
  }

  closeAllWindows() {
    this.store.dispatch(closeAllWindows());
  }

  downloadContent() {
    // TODO(gustavoauam): Turn this into an action.
    this.vm$.pipe(take(1)).subscribe((vm) => {
      if (vm.isTokensTabSelected) {
        this.ss.downloadTokenBoundaries();
      } else if (vm.isAnnotationsTabSelected) {
        this.ss.downloadSpans();
      }
    });
  }

  getUrl() {
    return utils.getAppUrl(this.router.url);
  }

  signOut() {
    this.auth.logout();
  }

  openAboutDialog(): void {
    this.dialog.open(AboutDialogComponent);
  }

  openAnnotationCountDialog(): void {
    this.dialog.open(AnnotationCountDialogComponent);
  }

  openByteCountDialog(): void {
    this.dialog.open(ByteCountDialogComponent);
  }

  openClearAllAnnotationsDialog(): void {
    this.dialog.open(ClearAllAnnotationsDialogComponent);
  }

  openClearAllTokensDialog(tokenLayerId: number): void {
    this.dialog.open(ClearAllTokensDialogComponent, {
      data: { tokenLayerId },
    });
  }

  openCreateCommentDialog(): void {
    this.dialog.open(CreateCommentDialogComponent);
  }

  openCreateLabelDialog(): void {
    this.dialog.open(CreateLabelDialogComponent);
  }

  openCreateTokenLayerDialog(): void {
    this.dialog.open(CreateTokenLayerDialogComponent);
  }

  openFileDetailsDialog(): void {
    this.dialog.open(FileDetailsDialogComponent);
  }

  openHelpDialog(): void {
    this.dialog.open(HelpDialogComponent);
  }

  openKeyboardShortcutsDialog(): void {
    this.dialog.open(KeyboardShortcutsDialogComponent);
  }

  openPrivacyPolicyDialog(): void {
    this.dialog.open(PrivacyPolicyDialogComponent);
  }

  openProfileDialog(): void {
    this.dialog.open(ProfileDialogComponent);
  }

  openResetTextDialog(): void {
    this.dialog.open(ResetTextDialogComponent);
  }

  openSendFeedbackDialog(): void {
    this.dialog.open(SendFeedbackDialogComponent);
  }

  openTermsOfUseDialog(): void {
    this.dialog.open(TermsOfUseDialogComponent);
  }

  openTokenCountDialog(): void {
    this.dialog.open(TokenCountDialogComponent);
  }

  openUpdateNameDialogComponent(): void {
    this.dialog.open(UpdateNameDialogComponent);
  }

  openUpdateLabelDialog(labelId: number): void {
    this.dialog.open(UpdateLabelDialogComponent, {
      data: { labelId },
    });
  }

  openUpdateCommentDialog(selected: number): void {
    this.dialog.open(UpdateCommentDialogComponent, {
      data: { selected: selected },
    });
  }

  openUpdateTokenLayerDialog(selected: number): void {
    this.dialog.open(UpdateTokenLayerDialogComponent, {
      data: { selected: selected },
    });
  }

  print() {
    window.print();
  }

  resetWindows(id: number) {
    this.store.dispatch(resetWindows({ id }));
  }

  removeComment(id: number): void {
    this.store.dispatch(removeComment({ id }));
  }

  removeLabel(labelId: number): void {
    this.store.dispatch(removeLabel({ id: labelId }));
  }

  removeTokenLayer(id: number): void {
    this.store.dispatch(removeTokenLayer({ id }));
  }

  showSnackBarAnnotationsCopied() {
    this.snackBar.open('Annotations copied to clipboard', 'Dismiss');
  }

  showSnackBarLinkCopied() {
    this.snackBar.open('Link copied to clipboard', 'Dismiss');
  }

  showSnackBarTextCopied() {
    this.snackBar.open('Text copied to clipboard', 'Dismiss');
  }

  showSnackBarTokensCopied() {
    this.snackBar.open('Tokens copied to clipboard', 'Dismiss');
  }

  toggleCommentsWindow() {
    this.store.dispatch(toggleCommentsWindow());
  }

  toggleLabelSetWindow() {
    this.store.dispatch(toggleLabelSetWindow());
  }

  toggleSuggestionsWindow() {
    this.store.dispatch(toggleSuggestionsWindow());
  }

  toggleTokenizersWindow() {
    this.store.dispatch(toggleTokenizersWindow());
  }

  toggleTokenLayersWindow() {
    this.store.dispatch(toggleTokenLayersWindow());
  }

  // TODO(gustavoauma): Add a proper type here.
  uploadTextFile(fileInputEvent: any) {
    let fileReader = new FileReader();
    fileReader.onload = (_) => {
      let content = fileReader.result;
      this.store.dispatch(uploadTextBody({ raw_string: content as string }));
    };
    fileReader.readAsText(fileInputEvent.target.files[0]);
  }
}
