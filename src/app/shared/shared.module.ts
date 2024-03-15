import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

import { FromNowPipe, ToNowPipe } from '@app/pipes';

import { ErrorDialogService } from './errors/error-dialog.service';
import { ErrorDialogComponent } from './errors/error-dialog/error-dialog.component';
import { LoadingDialogService } from './loading/loading-dialog.service';
import { LoadingDialogComponent } from './loading/loading-dialog/loading-dialog.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

const sharedComponents = [
  ErrorDialogComponent,
  LoadingDialogComponent,
  ProgressBarComponent,
];

@NgModule({
  declarations: [
    // Pipes
    FromNowPipe,
    ToNowPipe,
    ...sharedComponents,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // Material
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    // Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // Pipes
    FromNowPipe,
    ToNowPipe,
    ...sharedComponents,
  ],
  providers: [ErrorDialogService, LoadingDialogService],
})
export class SharedModule {}
