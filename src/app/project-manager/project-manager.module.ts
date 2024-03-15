import { CdkMenuModule } from '@angular/cdk/menu';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxColorsModule } from 'ngx-colors';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { AppRoutingModule } from '@app/app-routing.module';
import { TokenInterceptor } from '@app/interceptors';
import { SharedModule } from '@app/shared/shared.module';
import * as fromComponents from '@pm/components';
import * as fromDirectives from '@pm/directives';
import { GlobalErrorHandler } from '@pm/errors';
import * as fromPages from '@pm/pages';
import { ColorSquareComponent } from './components/shared/color-square/color-square.component';

@NgModule({
  declarations: [
    // Components
    fromComponents.AddTokenLayersDialogComponent,
    fromComponents.AvatarComponent,
    fromComponents.BaseLiWithImgComponent,
    fromComponents.ChipComponent,
    fromComponents.CorpusCardComponent,
    fromComponents.CorpusDetailsHeaderCardComponent,
    fromComponents.CorpusDownloadDialogComponent,
    fromComponents.CorpusEditTextsDialogComponent,
    fromComponents.CorpusFormDialogComponent,
    fromComponents.CorpusLiItemComponent,
    fromComponents.CorpusListFiltersComponent,
    fromComponents.CorpusNewsFeedItemComponent,
    fromComponents.CreateCorpusDialogComponent,
    fromComponents.CreateLabelDialogComponent,
    fromComponents.CreateLabelSetDialogComponent,
    fromComponents.CreateTaskDialogComponent,
    fromComponents.CreateTaskTextDialogComponent,
    fromComponents.CreateTaskLabelDialogComponent,
    fromComponents.CreateTextDialogComponent,
    fromComponents.DetailsHeaderCardComponent,
    fromComponents.LayoutWithRightSidenavComponent,
    fromComponents.EntityLiItemComponent,
    fromComponents.FirstTimeTipCardComponent,
    fromComponents.FollowersDialogComponent,
    fromComponents.GenerateTextsDialogComponent,
    fromComponents.HomeHeaderCardComponent,
    fromComponents.HomeIntroCardComponent,
    fromComponents.HomeWelcomeCardComponent,
    fromComponents.IsPendingChipComponent,
    fromComponents.IsPublicChipComponent,
    fromComponents.IsSeedChipComponent,
    fromComponents.LabelFormDialogComponent,
    fromComponents.LabelLiItemComponent,
    fromComponents.LabelListFiltersComponent,
    fromComponents.LabelSetCardComponent,
    fromComponents.LabelSetDetailsHeaderCardComponent,
    fromComponents.LabelSetDownloadDialogComponent,
    fromComponents.LabelSetEditLabelsDialogComponent,
    fromComponents.LabelSetFormDialogComponent,
    fromComponents.LabelSetLiItemComponent,
    fromComponents.LabelSetListFiltersComponent,
    fromComponents.LabelSetNewsFeedItemComponent,
    fromComponents.LabelUlCardComponent,
    fromComponents.LayoutLiWithActionsComponent,
    fromComponents.LayoutResultsWithPaginatorComponent,
    fromComponents.ListHeaderCardComponent,
    fromComponents.LoaderCardComponent,
    fromComponents.MetricComponent,
    fromComponents.MyCorpusListHeaderCardComponent,
    fromComponents.MyLabelSetListHeaderCardComponent,
    fromComponents.MyTaskListHeaderCardComponent,
    fromComponents.NewsFeedItemComponent,
    fromComponents.NoDataCardComponent,
    fromComponents.PaginatorComponent,
    fromComponents.PublicCorpusListHeaderCardComponent,
    fromComponents.PublicLabelSetListHeaderCardComponent,
    fromComponents.SearchBarComponent,
    fromComponents.SearchFiltersComponent,
    fromComponents.SearchHeaderCardComponent,
    fromComponents.RenameDialogComponent,
    fromComponents.StatusChipComponent,
    fromComponents.TagComponent,
    fromComponents.TagListTruncatedComponent,
    fromComponents.TagsFormFieldComponent,
    fromComponents.TaskCardComponent,
    fromComponents.TaskDetailsHeaderCardComponent,
    fromComponents.TaskDownloadDialogComponent,
    fromComponents.TaskEditTaskLabelsDialogComponent,
    fromComponents.TaskEditTaskTextsDialogComponent,
    fromComponents.TaskFormDialogComponent,
    fromComponents.TaskStatisticsCardComponent,
    fromComponents.TaskTextLiItemComponent,
    fromComponents.TaskTextListFiltersComponent,
    fromComponents.TaskTextUlCardComponent,
    fromComponents.TaskLabelLiItemComponent,
    fromComponents.TaskLabelListFiltersComponent,
    fromComponents.TaskLabelUlCardComponent,
    fromComponents.TaskLiItemComponent,
    fromComponents.TaskListFiltersComponent,
    fromComponents.TextFormDialogComponent,
    fromComponents.TextLiItemComponent,
    fromComponents.TextListFiltersComponent,
    fromComponents.TextUlCardComponent,
    fromComponents.UpdateCorpusDialogComponent,
    fromComponents.UpdateLabelDialogComponent,
    fromComponents.UpdateLabelSetDialogComponent,
    fromComponents.UpdateTagsDialogComponent,
    fromComponents.UpdateTaskDialogComponent,
    fromComponents.UpdateTaskTextDialogComponent,
    fromComponents.UpdateTaskLabelDialogComponent,
    fromComponents.UpdateTextDialogComponent,
    fromComponents.UpdateUserProfileDialogComponent,
    fromComponents.UpvotesDialogComponent,
    fromComponents.UpvoteButtonComponent,
    fromComponents.UsageDialogComponent,
    fromComponents.UserDetailsHeaderCardComponent,
    fromComponents.UserDetailsStatisticsCardComponent,
    fromComponents.UserFormDialogComponent,
    fromComponents.ViewTaskTextDialogComponent,
    fromComponents.ViewTextDialogComponent,

    // Directives
    fromDirectives.BaseListFiltersDirective,
    fromDirectives.CountUpDirective,

    // Pages
    fromPages.ActivateAccountPage,
    fromPages.CorpusDetailPage,
    fromPages.CorpusListPage,
    fromPages.ErrorPage,
    fromPages.HomePage,
    fromPages.LabelSetDetailPage,
    fromPages.LabelSetListPage,
    fromPages.LoginPage,
    fromPages.ProjectManagementPage,
    fromPages.PublicCorpusListPage,
    fromPages.PublicLabelSetListPage,
    fromPages.SearchPage,
    fromPages.SignUpPage,
    fromPages.TaskDetailPage,
    fromPages.TaskListPage,
    fromPages.UserProfileDetailPage,
    fromPages.UserSettingsPage,
    ColorSquareComponent,
  ],
  imports: [
    AppRoutingModule,
    RouterModule,
    SharedModule,

    // Material modules
    CdkMenuModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,

    // External
    NgxColorsModule,
    NgxSkeletonLoaderModule,
    NgxChartsModule,
  ],
  exports: [fromPages.ProjectManagementPage],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class ProjectManagerModule {}
