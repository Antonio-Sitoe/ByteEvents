import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  LOCALE_ID,
} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import {
  lucideLogOut,
  lucidePlus,
  lucideCalendar,
  lucideEye,
  lucideHouse,
  lucideX,
} from '@ng-icons/lucide';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { routes } from './app.routes';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideIcons({ lucideLogOut, lucidePlus, lucideCalendar, lucideHouse, lucideEye, lucideX }),
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
};
