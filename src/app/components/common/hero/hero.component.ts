import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage],
  template: `
    <div class="relative h-89 sm:h-50 lg:h-106">
      <picture class="absolute h-full w-full bg-light-gray">
        <img
          [ngSrc]="$image()"
          [alt]="$imageAlt() ?? $title() ?? 'Hero image'"
          class="object-cover"
          priority
          fill
        />
      </picture>
      @if ($title(); as title) {
        <div class="absolute top-2/5 flex w-full items-center justify-center">
          <h1 class="text-4xl font-semibold text-white">{{ title }}</h1>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  readonly $image = input.required<string>({ alias: 'image' });
  readonly $imageAlt = input<string>(undefined, { alias: 'imageAlt' });
  readonly $title = input<string>(undefined, { alias: 'title' });
}
