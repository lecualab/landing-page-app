import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HeroBackgroundComponent } from './ui/hero-background';

@Component({
  selector: 'app-hero',
  imports: [HeroBackgroundComponent, NgClass],
  template: `
    @let title = $title();

    <div
      class="relative mb-10 min-h-max md:mb-14 lg:h-100"
      [ngClass]="{
        'h-80 sm:h-70': sizeBetween(title, 0, 20),
        'h-100 sm:h-90': sizeBetween(title, 20, 40),
        'h-120 sm:h-110': sizeBetween(title, 40, 60),
        'h-140 sm:h-130': sizeBetween(title, 60),
      }"
    >
      <div class="absolute h-full w-full">
        <ng-content select="[slot='background']">
          <app-hero-background />
        </ng-content>
      </div>
      <div class="absolute flex h-full w-full items-center justify-center">
        <div class="max-w-2/3 lg:max-w-2xl">
          <h1 class="text-center text-4xl font-semibold text-pretty text-white">
            {{ title }}
          </h1>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  readonly $title = input.required<string>({ alias: 'title' });

  protected sizeBetween(str: string, min: number, max = Infinity): boolean {
    return str.length >= min && str.length < max;
  }
}
