import { afterNextRender, DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { PixelService } from 'ngx-multi-pixel';
import { filter, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CookiesService {
  readonly #pixelService = inject(PixelService);
  readonly #cookieConsentService = inject(NgcCookieConsentService);
  readonly #translateService = inject(TranslateService);
  readonly #destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender({
      earlyRead: () => {
        return {
          hasAnswered: this.#cookieConsentService.hasAnswered(),
          hasConsented: this.#cookieConsentService.hasConsented(),
        };
      },
      write: ({ hasAnswered, hasConsented }) => {
        this.#translateService
          .get('cookieConsent')
          .pipe(
            filter(isValidTranslation),
            tap((translation) => {
              this.#cookieConsentService.destroy();
              this.#cookieConsentService.init({
                cookie: {
                  domain: window.location.hostname,
                  expiryDays: 180,
                  secure: true,
                },
                theme: 'classic',
                type: 'opt-out',
                palette: {
                  popup: {
                    background: 'var(--color-black)',
                    text: 'var(--color-white)',
                    link: 'var(--color-white)',
                  },
                  button: {
                    background: 'var(--color-secondary)',
                    text: 'var(--color-white)',
                  },
                },
                content: {
                  header: translation['header'],
                  message: translation['message'],
                  link: translation['link'],
                  policy: translation['policy'],
                  allow: translation['allow'],
                  deny: translation['deny'],
                },
              });
            }),
            takeUntilDestroyed(this.#destroyRef),
          )
          .subscribe(() => {
            if (!hasAnswered) {
              this.#cookieConsentService.open();
              return;
            }

            if (hasConsented) this.#pixelService.initialize();
          });
      },
    });

    this.#cookieConsentService.statusChange$
      .pipe(
        filter(({ status }) => status === 'allow'),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.#pixelService.initialize();
      });

    this.#cookieConsentService.statusChange$
      .pipe(
        filter(({ status }) => status === 'deny'),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.#pixelService.remove();
      });

    this.#cookieConsentService.revokeChoice$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.#pixelService.remove();
      });
  }
}

function isValidTranslation(
  translation: unknown,
): translation is Record<string, string> {
  return (
    !!translation &&
    typeof translation === 'object' &&
    !Array.isArray(translation) &&
    Object.keys(translation).length > 0 &&
    Object.values(translation).every((value) => typeof value === 'string')
  );
}
