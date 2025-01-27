import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `<p>home works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}
