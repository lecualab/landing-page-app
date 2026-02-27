import {
  EnvironmentProviders,
  importProvidersFrom,
  Provider,
} from '@angular/core';
import {
  DefaultMissingTranslationHandler,
  provideMissingTranslationHandler,
  provideTranslateLoader,
  provideTranslateService,
  TranslateNoOpLoader,
} from '@ngx-translate/core';
import { NgxTranslateCutModule } from 'ngx-translate-cut';

export default [
  provideTranslateService({
    loader: provideTranslateLoader(TranslateNoOpLoader),
    missingTranslationHandler: provideMissingTranslationHandler(
      DefaultMissingTranslationHandler,
    ),
  }),
  importProvidersFrom(NgxTranslateCutModule.forRoot()),
] satisfies (Provider | EnvironmentProviders)[];
