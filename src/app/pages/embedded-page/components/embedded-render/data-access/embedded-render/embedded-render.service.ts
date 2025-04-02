import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, map, shareReplay, Subject, tap } from 'rxjs';
import { EmbeddedRenderDto } from './dtos';
import { EMBEDDED_VIEWS } from './embedded-views.const';

@Injectable({ providedIn: 'root' })
export class EmbeddedRenderService {
  readonly #renderId$ = new Subject<EmbeddedRenderDto['id']>();
  readonly #hasError$ = new Subject<boolean>();

  readonly #embeddedRender$ = this.#renderId$.pipe(
    distinctUntilChanged(),
    tap(() => {
      this.#hasError$.next(false);
    }),
    map((id) => EMBEDDED_VIEWS.find((view) => view.id === id)),
    tap((embeddedRender) => {
      if (!embeddedRender) this.#hasError$.next(true);
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly $embeddedRender = toSignal(this.#embeddedRender$);
  readonly $hasError = toSignal(this.#hasError$);

  retrieveEmbeddedRender(id: EmbeddedRenderDto['id']): void {
    this.#renderId$.next(id);
  }
}
