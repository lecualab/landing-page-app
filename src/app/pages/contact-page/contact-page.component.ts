import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactHeroComponent } from './components/contact-hero';

@Component({
  imports: [ContactHeroComponent],
  template: `<app-contact-hero />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPageComponent {}
