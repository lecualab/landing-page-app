import { DeferBlockState } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { HomeHeroDto, HomeHeroService } from './data-access/home-hero';
import { HomeHeroComponent } from './home-hero.component';

describe('HomeHeroComponent', () => {
  let homeHeroService: jasmine.SpyObj<HomeHeroService>;

  describe('when home hero is loaded', () => {
    beforeEach(() => {
      homeHeroService = jasmine.createSpyObj<HomeHeroService>({
        $homeHero: {
          backgroundImageUrl: 'background-image-url' as any,
        } as HomeHeroDto,
        $hasValue: true,
      });
    });

    it('should render the hero content', async () => {
      await render(HomeHeroComponent, {
        componentProviders: [
          { provide: HomeHeroService, useValue: homeHeroService },
        ],
        deferBlockStates: DeferBlockState.Complete,
      });

      const actual = screen.getByTestId('hero-content');

      expect(actual).toBeVisible();
    });

    it('should not display the loader', async () => {
      await render(HomeHeroComponent, {
        componentProviders: [
          { provide: HomeHeroService, useValue: homeHeroService },
        ],
        deferBlockStates: DeferBlockState.Complete,
      });

      const actual = screen.queryByRole('progressbar');

      expect(actual).toBeNull();
    });
  });

  describe('when hero is loading', () => {
    beforeEach(() => {
      homeHeroService = jasmine.createSpyObj<HomeHeroService>({
        $hasValue: false,
      });
    });

    it('should render the loader', async () => {
      await render(HomeHeroComponent, {
        componentProviders: [
          { provide: HomeHeroService, useValue: homeHeroService },
        ],
      });

      const actual = screen.getByRole('progressbar');

      expect(actual).toBeVisible();
    });
  });
});
