// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const environment = {
  production: false,

  // datastand-frontend config
  appUrl: 'http://localhost:4200',

  // datastand-backend config
  //
  // For local backend uncomment the following line.
  // backendApiUrl: 'http://localhost:7001/api',
  backendApiUrl: '/api',

  imports: [StoreDevtoolsModule.instrument({ maxAge: 25 })],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
