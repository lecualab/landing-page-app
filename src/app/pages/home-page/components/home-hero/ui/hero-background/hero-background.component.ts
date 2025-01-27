import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-hero-background',
  imports: [NgOptimizedImage],
  template: `
    <picture data-testid="hero-background">
      <img
        [ngSrc]="$backgroundImageUrl()"
        alt="Hero background"
        class="object-cover"
        priority
        fill
      />
    </picture>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroBackgroundComponent {
  readonly $backgroundImageUrl = input.required<string>({
    alias: 'backgroundImageUrl',
  });
}
