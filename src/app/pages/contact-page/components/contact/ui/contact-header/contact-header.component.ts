import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-header',
  imports: [TranslatePipe],
  template: `
    <div
      data-testid="contact-header"
      class="prose mb-8 max-w-none text-center prose-h2:text-3xl"
    >
      <h2>{{ 'contact.header.title' | translate }}</h2>
      <p>{{ 'contact.header.subtitle' | translate }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactHeaderComponent {}
