import { ClipboardModule } from '@angular/cdk/clipboard';
import { DialogModule } from '@angular/cdk/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkMenuModule } from '@angular/cdk/menu';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '@app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxColorsModule } from 'ngx-colors';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import * as fromComponents from './components';
import * as fromDirectives from './directives';
import * as fromPages from './pages';

import {
  CommentEffects,
  SnackBarEffects,
  TaskTextEffects,
  TokenLayersEffects,
  WorkbenchUiEffects,
} from './store/effects';
import {
  commentsFeatureKey,
  commentsReducer,
  textFeatureKey,
  textReducer,
  tokenLayersFeatureKey,
  tokenLayersReducer,
  workbenchUiFeatureKey,
  workbenchUiReducer,
} from './store/reducer';
import { SpanEffects, spansFeatureKey, spansReducer } from './store/spans';
import {
  LabelEffects,
  labelsFeatureKey,
  labelsReducer,
} from './store/task-labels';

@NgModule({
  declarations: [
    // Components
    fromComponents.AboutDialogComponent,
    fromComponents.AnnotationCountDialogComponent,
    fromComponents.AnnotationsTabComponent,
    fromComponents.ByteCountDialogComponent,
    fromComponents.CharComponent,
    fromComponents.ClearAllAnnotationsDialogComponent,
    fromComponents.ClearAllTokensDialogComponent,
    fromComponents.CommentsWindowComponent,
    fromComponents.CreateCommentDialogComponent,
    fromComponents.CreateLabelDialogComponent,
    fromComponents.CreateTokenLayerDialogComponent,
    fromComponents.FileDetailsDialogComponent,
    fromComponents.HelpDialogComponent,
    fromComponents.ItemsNavigationPanelComponent,
    fromComponents.LabelSetWindowComponent,
    fromComponents.KeyboardShortcutsDialogComponent,
    fromComponents.MouseLabelComponent,
    fromComponents.PrivacyPolicyDialogComponent,
    fromComponents.ProfileDialogComponent,
    fromComponents.ProgressBarComponent,
    fromComponents.ResetTextDialogComponent,
    fromComponents.SendFeedbackDialogComponent,
    fromComponents.SpanComponent,
    fromComponents.StatusBadgeComponent,
    fromComponents.SuggestionsWindowComponent,
    fromComponents.TermsOfUseDialogComponent,
    fromComponents.TopbarComponent,
    fromComponents.TokenComponent,
    fromComponents.TokenCountDialogComponent,
    fromComponents.TokenLayersWindowComponent,
    fromComponents.TokenizersWindowComponent,
    fromComponents.TokensTabComponent,
    fromComponents.UpdateCommentDialogComponent,
    fromComponents.UpdateLabelDialogComponent,
    fromComponents.UpdateNameDialogComponent,
    fromComponents.UpdateTokenLayerDialogComponent,
    fromComponents.WindowComponent,
    fromComponents.WorkbenchBaseComponent,

    // Pages
    fromPages.SignupClosedComponent,
    fromPages.WorkbenchDemoComponent,
    fromPages.WorkbenchComponent,

    // Directives
    fromDirectives.NoRightClickDirective,
  ],
  imports: [
    SharedModule,

    // Material modules
    CdkMenuModule,
    ClipboardModule,
    DialogModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,

    // External
    NgxColorsModule,
    NgxSkeletonLoaderModule,

    // Store modules
    StoreModule.forFeature(commentsFeatureKey, commentsReducer),
    StoreModule.forFeature(labelsFeatureKey, labelsReducer),
    StoreModule.forFeature(textFeatureKey, textReducer),
    StoreModule.forFeature(spansFeatureKey, spansReducer),
    StoreModule.forFeature(tokenLayersFeatureKey, tokenLayersReducer),
    StoreModule.forFeature(workbenchUiFeatureKey, workbenchUiReducer),
    EffectsModule.forFeature(
      CommentEffects,
      LabelEffects,
      SnackBarEffects,
      SpanEffects,
      TaskTextEffects,
      TokenLayersEffects,
      WorkbenchUiEffects
    ),
  ],
  exports: [fromPages.WorkbenchComponent],
})
export class WorkbenchModule {}
