import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-form-received',
  imports: [TranslatePipe],
  template: `
    <div data-testid="contact-form-received" class="flex flex-col items-center">
      <picture class="overflow-hidden rounded-full">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrvk6t5CW9qn4qS74hLoml4uGgLIPxZwOWng&s"
          alt="Contact form submitted"
        />
      </picture>
      <p class="mt-4 text-center text-xl">
        {{ 'contact.form.success' | translate }}
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormReceivedComponent {}
