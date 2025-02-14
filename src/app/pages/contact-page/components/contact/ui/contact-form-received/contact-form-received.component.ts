import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-form-received',
  imports: [TranslatePipe],
  template: `
    <div
      data-testid="contact-form-received"
      class="grid md:m-auto md:max-w-2xl md:grid-cols-2 **:md:text-right"
    >
      <h2 class="text-center text-4xl font-semibold md:place-self-end">
        {{ 'contact.form.received.title' | translate }}
      </h2>
      <picture
        class="mt-20 animate-bounce md:row-span-2 md:mb-5 md:place-self-center"
      >
        <img
          src="media/icons/lecualina/lecualina-happy.svg"
          alt="Contact form submitted"
          class="m-auto size-40 md:size-50"
        />
      </picture>
      <p class="mt-4 text-center text-xl">
        {{ 'contact.form.received.message' | translate }}
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormReceivedComponent {}
