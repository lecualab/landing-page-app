import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SkeletonComponent } from '@app/components/common/skeleton';
import { HomeHeroService } from './data-access/home-hero';
import { HeroBackgroundComponent } from './ui/hero-background';
import { HeroContentComponent } from './ui/hero-content';

@Component({
  selector: 'app-home-hero',
  imports: [
    HeroContentComponent,
    HeroBackgroundComponent,
    SkeletonComponent,
    MatProgressSpinnerModule,
  ],
  template: `
    <section class="relative h-[504px]">
      @defer (when homeHeroService.$hasValue()) {
        @let hero = homeHeroService.$homeHero()!;

        <div class="absolute h-full w-full bg-light-gray">
          <app-hero-background [backgroundImageUrl]="hero.backgroundImageUrl" />
        </div>
        <div class="absolute bottom-0 z-10 h-auto w-full pb-30 text-left">
          <app-hero-content [hero]="hero" />
        </div>
      } @placeholder (minimum 1000ms) {
        <app-skeleton height="full" />
      }
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHeroComponent {
  protected readonly homeHeroService = inject(HomeHeroService);
}
