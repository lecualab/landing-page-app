import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-commitment',
  imports: [TranslatePipe],
  template: `
    <div
      data-testid="commitment"
      class="mt-6 flex flex-col items-center justify-center px-2"
    >
      <svg
        class="h-25 rotate-180 text-accent md:h-15"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 320"
        role="img"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M239.64 74.01c-32.16-.89-59.56 23.76-61.9 55.85-2.59 35.43 25.38 64.97 60.26 64.97 0 0 0 15.82-10.97 34.02-5.9 9.79 4.91 21.1 15.04 15.8 30.22-15.81 62.45-48.71 56.36-110.25-3.24-32.64-26.45-59.5-58.79-60.39zm-156.74 0c-32.16-.89-59.56 23.76-61.9 55.85-2.59 35.43 25.38 64.97 60.26 64.97 0 0 0 15.82-10.97 34.02-5.9 9.79 4.91 21.1 15.04 15.8 30.22-15.81 62.45-48.71 56.36-110.25-3.25-32.64-26.45-59.5-58.79-60.39z"
          fill="currentColor"
        ></path>
      </svg>
      <blockquote
        class="max-w-xl text-center text-2xl font-light tracking-wide text-pretty italic lg:max-w-4xl lg:tracking-wider"
      >
        {{ 'home.businessUnits.commitment' | translate }}
      </blockquote>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommitmentComponent {}
