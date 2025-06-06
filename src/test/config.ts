import { NgModule, provideZonelessChangeDetection } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';
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
@NgModule({ providers: [provideZonelessChangeDetection()] })
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
    BrowserTestingModule,
    ZonelessModule,
    NoopAnimationsModule,
    TranslateTestingModule,
  ],
  platformBrowserTesting(),
  {
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true,
  },
);
