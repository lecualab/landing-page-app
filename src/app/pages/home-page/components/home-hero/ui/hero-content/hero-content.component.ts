import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ContentLayoutComponent } from '@app/components/content-layout';
import { HeroContentDto } from './dtos';

@Component({
  selector: 'app-hero-content',
  imports: [MatIconModule, ContentLayoutComponent],
  template: `
    @let hero = $hero();

    <app-content-layout>
      <div data-testid="hero-content" class="space-y-4">
        <span data-testid="hero-subtitle" class="inline-block opacity-40">
          {{ hero.subtitle }}
        </span>
        <h2 data-testid="hero-title" class="text-3xl font-medium text-white">
          {{ hero.title }}
        </h2>
      </div>
    </app-content-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroContentComponent {
  readonly $hero = input.required<HeroContentDto>({ alias: 'hero' });
}
