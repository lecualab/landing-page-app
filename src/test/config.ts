import {
  NgModule,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  FakeMissingTranslationHandler,
  MissingTranslationHandler,
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import JasmineDOM from '@testing-library/jasmine-dom';

/**
 * INFO:
 * THIS MODULE USED TO CONFIGURE EXPERIMENTAL ZONELESS CHANGE DETECTION.
 * WHEN ZONELESS CHANGE DETECTION WILL BE STABLE, THIS MODULE SHOULD BE REMOVED.
 */
@NgModule({ providers: [provideExperimentalZonelessChangeDetection()] })
class ZonelessModule {}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateFakeLoader,
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: FakeMissingTranslationHandler,
      },
    }),
  ],
})
class TranslateTestingModule {}

beforeAll(() => {
  jasmine.addMatchers(JasmineDOM);
});

getTestBed().initTestEnvironment(
  [
    BrowserDynamicTestingModule,
    ZonelessModule,
    NoopAnimationsModule,
    TranslateTestingModule,
  ],
  platformBrowserDynamicTesting(),
  {
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true,
  },
);
