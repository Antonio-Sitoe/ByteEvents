import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  LOCALE_ID,
} from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import {
  lucideLogOut,
  lucidePlus,
  lucideCalendar,
  lucideEye,
  lucideHouse,
  lucideX,
  lucideArrowLeft,
  lucideGlobe,
  lucideChevronLeft,
  lucideChevronRight,
  lucideChevronUp,
  lucideChevronDown,
  lucideChartBar,
  lucideSettings,
  lucideUsers,
  lucidePencil,
  lucideTrash2,
  lucideClock,
  lucideMessageCircle,
  lucideMail,
  lucideSearch,
  lucideTrash,
} from '@ng-icons/lucide';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { routes } from './app.routes';
import { AuthInterceptor } from './core/http/auth.interceptor';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideRouter(routes),
    provideIcons({
      lucideLogOut,
      lucidePlus,
      lucideCalendar,
      lucideHouse,
      lucideEye,
      lucideX,
      lucideArrowLeft,
      lucideGlobe,
      lucideChevronLeft,
      lucideChevronRight,
      lucideChevronUp,
      lucideChevronDown,
      lucideChartBar,
      lucideSettings,
      lucideUsers,
      lucidePencil,
      lucideTrash2,
      lucideClock,
      lucideMessageCircle,
      lucideMail,
      lucideSearch,
      lucideTrash,
    }),
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
};
