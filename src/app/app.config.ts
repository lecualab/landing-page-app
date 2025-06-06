import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
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
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideNgcCookieConsent } from 'ngx-cookieconsent';
import { PixelModule } from 'ngx-multi-pixel';
import { NgxTranslateCutModule } from 'ngx-translate-cut';
import { routes } from './app.routes';
import { FacebookPixel } from './utils/constants';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withViewTransitions(), withComponentInputBinding()),
    provideClientHydration(withEventReplay(), withIncrementalHydration()),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideTranslateService({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        deps: [HttpClient],
        useFactory: (httpClient: HttpClient) =>
          new TranslateHttpLoader(
            httpClient,
            './i18n/',
            `.json?v=${Date.now()}`,
          ),
      },
    }),
    importProvidersFrom(
      NgxTranslateCutModule,
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
