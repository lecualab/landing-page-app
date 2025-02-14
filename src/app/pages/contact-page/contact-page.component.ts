import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentLayoutComponent } from '@app/components/content-layout';
import { ContactComponent } from './components/contact';
import { ContactHeroComponent } from './components/contact-hero';

@Component({
  imports: [ContactHeroComponent, ContactComponent, ContentLayoutComponent],
  template: `
    <app-contact-hero />
    <app-content-layout>
      <app-contact />
    </app-content-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPageComponent {}
