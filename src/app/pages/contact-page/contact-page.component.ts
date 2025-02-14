import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `<p>Contact page works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPageComponent {}
