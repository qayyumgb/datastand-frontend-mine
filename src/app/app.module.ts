import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import * as BaseComponents from './base/components';
import * as AppPages from './pages';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from './environments';
import { ProjectManagerModule } from './project-manager/project-manager.module';
import { SharedModule } from './shared/shared.module';
import { WorkbenchModule } from './workbench/workbench.module';

let imports = [
  AppRoutingModule,
  BrowserAnimationsModule,
  BrowserModule,
  HttpClientModule,
  StoreModule.forRoot({ router: routerReducer }),
  EffectsModule.forRoot(),
  StoreRouterConnectingModule.forRoot(),

  // Data Stand modules.
  ProjectManagerModule,
  SharedModule,
  WorkbenchModule,

  // Material modules.
  MatButtonModule,

  // Dev/prod conditioned imports.
  environment.imports,
];

@NgModule({
  declarations: [
    AppComponent,
    AppPages.NotFoundComponent,
    BaseComponents.OnlyBigScreenComponent,
  ],
  imports: imports,
  providers: [
    // Set default duration for the snack-bar.
    // https://material.angular.io/components/snack-bar/overview
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 3000,
        horizontalPosition: 'left',
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
