import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-content-layout',
  template: `
    <section
      data-testid="content-layout"
      class="m-auto px-5 sm:max-w-2xl md:max-w-3xl lg:mx-15 lg:max-w-full 2xl:mx-35"
    >
      <ng-content />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentLayoutComponent {}
