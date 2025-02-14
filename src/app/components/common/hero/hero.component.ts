import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HeroBackgroundComponent } from './ui/hero-background';

@Component({
  selector: 'app-hero',
  imports: [HeroBackgroundComponent],
  template: `
    <div class="relative h-70 sm:h-60 lg:h-90">
      <div class="absolute h-full w-full">
        <ng-content select="[slot='background']">
          <app-hero-background />
        </ng-content>
      </div>
      <div class="absolute flex h-full w-full items-center justify-center">
        <h1 class="text-4xl font-semibold text-white">
          {{ $title() }}
        </h1>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  readonly $title = input.required<string>({ alias: 'title' });
}
