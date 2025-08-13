import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './infrastructure/interceptor/auth-interceptor';
import { provideStore } from '@ngrx/store';
import { calendarSingleRangeDateReducer } from './shared/components/forms/calendar-single/store/reducers/range-date.reducer';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideStore({
      calendarMainReducers: calendarSingleRangeDateReducer
    }), provideAnimationsAsync(),
  ],
};
