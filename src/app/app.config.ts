import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { UserFormEffects } from './user-form/state-management/user-form.effects';
import { userFormReducer } from './user-form/reducers';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ userForm: userFormReducer }),
    provideAnimationsAsync(),
    provideEffects([UserFormEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
