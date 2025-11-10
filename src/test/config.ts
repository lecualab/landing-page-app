import { NgModule, provideZonelessChangeDetection } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';
import {
  DefaultMissingTranslationHandler,
  provideMissingTranslationHandler,
  provideTranslateLoader,
  TranslateModule,
  TranslateNoOpLoader,
} from '@ngx-translate/core';
import JasmineDOM from '@testing-library/jasmine-dom';
import { NgxTranslateCutModule } from 'ngx-translate-cut';

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
      loader: provideTranslateLoader(TranslateNoOpLoader),
      missingTranslationHandler: provideMissingTranslationHandler(
        DefaultMissingTranslationHandler,
      ),
    }),
    NgxTranslateCutModule.forRoot(),
  ],
})
class TranslateTestingModule {}

beforeAll(() => {
  jasmine.addMatchers(JasmineDOM);
});

getTestBed().initTestEnvironment(
  [BrowserTestingModule, ZonelessModule, TranslateTestingModule],
  platformBrowserTesting(),
  {
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true,
  },
);
