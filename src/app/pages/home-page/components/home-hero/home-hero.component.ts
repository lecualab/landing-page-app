import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeroBackgroundComponent } from '@app/components/common/hero';
import { HeroContentComponent } from './ui/hero-content';

@Component({
  selector: 'app-home-hero',
  imports: [
    HeroContentComponent,
    HeroBackgroundComponent,
    MatProgressSpinnerModule,
  ],
  template: `
    <section class="relative h-100 sm:h-80 md:h-100 lg:h-110">
      <app-hero-background height="h-[120%] sm:h-[130%] lg:h-[145%]" />
      <div class="absolute bottom-2/5 z-10 h-auto w-full text-left">
        <app-hero-content />
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHeroComponent {}
