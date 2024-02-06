import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import {
  TaskLabelListFiltersComponent,
  TaskLabelUlCardComponent,
  TaskStatisticsCardComponent,
  TaskTextListFiltersComponent,
  TaskTextUlCardComponent,
} from '@pm/components';
import { NotFoundComponent } from './pages';
import {
  ActivateAccountPage,
  CorpusDetailPage,
  CorpusListPage,
  ErrorPage,
  HomePage,
  LabelSetDetailPage,
  LabelSetListPage,
  LoginPage as PMLoginPage,
  SignUpPage as PMSignUpPage,
  ProjectManagementPage,
  PublicCorpusListPage,
  PublicLabelSetListPage,
  SearchPage,
  TaskDetailPage,
  TaskListPage,
  UserProfileDetailPage,
  UserSettingsPage,
} from './project-manager/pages';
import { WorkbenchComponent, WorkbenchDemoComponent } from './workbench/pages';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'pm/tasks/:taskId/items/:taskTextId',
    component: WorkbenchComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'paramsChange',
    title: 'Annotation',
  },
  {
    path: 'demo',
    component: WorkbenchDemoComponent,
    title: 'Annotation Demo',
  },
  {
    path: 'login',
    component: PMLoginPage,
    title: 'Login',
  },
  {
    path: 'signup',
    component: PMSignUpPage,
    title: 'Sign Up',
  },
  {
    path: 'activate-account/:uid/:token',
    component: ActivateAccountPage,
    title: 'Activate Account',
  },
  {
    path: 'pm',
    component: ProjectManagementPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomePage,
        title: 'Data Stand',
      },
      {
        path: 'corpora',
        component: CorpusListPage,
        title: 'Corpora',
      },
      {
        path: 'corpora/:corpusId',
        component: CorpusDetailPage,
        runGuardsAndResolvers: 'paramsChange',
        title: 'Corpus',
      },
      {
        path: 'label-sets',
        component: LabelSetListPage,
        title: 'Label Sets',
      },
      {
        path: 'label-sets/:labelSetId',
        component: LabelSetDetailPage,
        runGuardsAndResolvers: 'paramsChange',
        title: 'Label Set',
      },
      {
        path: 'public/corpora',
        component: PublicCorpusListPage,
        title: 'Public Corpora',
      },
      {
        path: 'public/label-sets',
        component: PublicLabelSetListPage,
        title: 'Public Label Sets',
      },
      {
        path: 'search',
        component: SearchPage,
        runGuardsAndResolvers: 'paramsChange',
        title: 'Search',
      },
      {
        path: 'tasks',
        component: TaskListPage,
        title: 'Tasks',
      },
      {
        path: 'tasks/:taskId',
        component: TaskDetailPage,
        runGuardsAndResolvers: 'paramsChange',
        title: 'Task',
        children: [
          {
            path: 'texts',
            children: [
              {
                path: '',
                component: TaskTextUlCardComponent,
                outlet: 'content',
              },
              {
                path: '',
                component: TaskTextListFiltersComponent,
                outlet: 'filters',
              },
            ],
            title: 'Task - Texts',
          },
          {
            path: 'labels',
            children: [
              {
                path: '',
                component: TaskLabelUlCardComponent,
                outlet: 'content',
              },
              {
                path: '',
                component: TaskLabelListFiltersComponent,
                outlet: 'filters',
              },
            ],
            title: 'Task - Labels',
          },
          {
            path: 'statistics',
            children: [
              {
                path: '',
                component: TaskStatisticsCardComponent,
                outlet: 'content',
              },
              {
                path: '',
                // TODO(gustavoauma): Add a proper view for this.
                component: TaskLabelListFiltersComponent,
                outlet: 'filters',
              },
            ],
            title: 'Task - Statistics',
          },
          { path: '**', redirectTo: 'texts' },
        ],
      },
      {
        path: 'users/:username',
        component: UserProfileDetailPage,
        runGuardsAndResolvers: 'paramsChange',
        title: 'User',
      },
      {
        path: 'user-settings',
        component: UserSettingsPage,
        title: 'User Settings',
      },
      {
        path: '**',
        component: ErrorPage,
        title: 'Error',
      },
    ],
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    title: 'Not Found',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routingConfiguration)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
