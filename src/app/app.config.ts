import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideBrowserGlobalErrorListeners,
  provideEnvironmentInitializer,
} from '@angular/core';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from '@angular/material/form-field';
import {
  provideClientHydration,
  withEventReplay,
  withIncrementalHydration,
} from '@angular/platform-browser';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideNgcCookieConsent } from 'ngx-cookieconsent';
import { PixelModule } from 'ngx-multi-pixel';
import { NgxTranslateCutModule } from 'ngx-translate-cut';
import { routes } from './app.routes';
import { FacebookPixel } from './utils/constants';
import { CookiesService } from './utils/cookies';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions(), withComponentInputBinding()),
    provideClientHydration(withEventReplay(), withIncrementalHydration()),
    provideHttpClient(withFetch()),
    provideEnvironmentInitializer(() => {
      // INFO: Manage cookie consent and pixel tracking
      inject(CookiesService);
    }),
    provideTranslateService({
      fallbackLang: 'es',
      loader: provideTranslateHttpLoader({
        prefix: './i18n/',
        enforceLoading: true,
      }),
    }),
    importProvidersFrom(
      NgxTranslateCutModule.forRoot(),
      PixelModule.forRoot({
        pixelId: [FacebookPixel.LANDING_PAGE_ACCESS],
      }),
    ),
    provideNgcCookieConsent({ enabled: false }),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        hideRequiredMarker: true,
        appearance: 'outline',
      } satisfies MatFormFieldDefaultOptions,
    },
  ],
};
