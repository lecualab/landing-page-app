import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { SnackBarService } from '@app/utils/snack-bar';
import { map } from 'rxjs';
import { ContactCustomerService } from './data-access/contact-customer';
import { ContactFormComponent } from './ui/contact-form';
import { ContactFormReceivedComponent } from './ui/contact-form-received';
import { ContactHeaderComponent } from './ui/contact-header';

@Component({
  selector: 'app-contact',
  imports: [
    ContactFormComponent,
    ContactHeaderComponent,
    ContactFormReceivedComponent,
  ],
  template: `
    <section class="grid gap-y-3">
      @if ($showFormReceived()) {
        <app-contact-form-received />
      } @else {
        <app-contact-header />
        <app-contact-form
          (submitForm)="contactCustomerService.contactCustomer($event)"
          [isLoading]="contactCustomerService.$isLoading()"
        />
      }
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  readonly #snackBarService = inject(SnackBarService);
  protected readonly contactCustomerService = inject(ContactCustomerService);

  protected readonly $showFormReceived = toSignal(
    this.contactCustomerService.success$.pipe(
      map(() => true),
      takeUntilDestroyed(),
    ),
  );

  constructor() {
    this.contactCustomerService.error$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.#snackBarService.open({ message: 'contact.form.error' });
      });
  }
}
