import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { environment } from '@environment';
import { catchError, EMPTY, Subject, switchMap, tap } from 'rxjs';
import { ContactCustomerDto } from './dtos';

@Injectable({ providedIn: 'root' })
export class ContactCustomerService {
  readonly #httpClient = inject(HttpClient);

  readonly #contactCustomerDto$ = new Subject<ContactCustomerDto>();

  readonly #isLoading$ = new Subject<boolean>();
  readonly $isLoading = toSignal(this.#isLoading$.asObservable(), {
    initialValue: false,
  });

  readonly #error$ = new Subject<void>();
  readonly error$ = this.#error$.asObservable();

  readonly #success$ = new Subject<void>();
  readonly success$ = this.#success$.asObservable();

  constructor() {
    this.#contactCustomerDto$
      .pipe(
        tap(() => {
          this.#isLoading$.next(true);
        }),
        switchMap((contactCustomer) =>
          this.#httpClient
            .post(`${environment.apiUrl}/v1/contact`, contactCustomer)
            .pipe(
              catchError((error: unknown) => {
                console.error(error);

                this.#error$.next();
                this.#isLoading$.next(false);

                return EMPTY;
              }),
              tap(() => {
                this.#success$.next();
                this.#isLoading$.next(false);
              }),
            ),
        ),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  contactCustomer(contactCustomerDto: ContactCustomerDto): void {
    this.#contactCustomerDto$.next(contactCustomerDto);
  }
}
