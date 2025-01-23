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
import JasmineDOM from '@testing-library/jasmine-dom';

/**
 * INFO:
 * THIS MODULE USED TO CONFIGURE EXPERIMENTAL ZONELESS CHANGE DETECTION.
 * WHEN ZONELESS CHANGE DETECTION WILL BE STABLE, THIS MODULE SHOULD BE REMOVED.
 */
@NgModule({ providers: [provideExperimentalZonelessChangeDetection()] })
class ZonelessModule {}

beforeAll(() => {
  jasmine.addMatchers(JasmineDOM);
});

getTestBed().initTestEnvironment(
  [BrowserDynamicTestingModule, ZonelessModule, NoopAnimationsModule],
  platformBrowserDynamicTesting(),
  {
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true,
  },
);
