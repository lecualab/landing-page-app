import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeroContentComponent } from './ui/hero-content';

@Component({
  selector: 'app-home-hero',
  imports: [HeroContentComponent, MatProgressSpinnerModule],
  template: `
    <section class="relative h-128 sm:h-80 md:h-100 lg:h-128">
      <div class="absolute h-full w-full bg-dark-gray"></div>
      <div class="absolute bottom-1/4 z-10 h-auto w-full text-left">
        <app-hero-content />
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHeroComponent {}
