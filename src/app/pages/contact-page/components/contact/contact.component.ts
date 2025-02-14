import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
    <section class="my-16 grid gap-y-3">
      <app-contact-header />
      @if (contactCustomerService.$success()) {
        <app-contact-form-received />
      } @else {
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
  protected readonly contactCustomerService = inject(ContactCustomerService);
}
