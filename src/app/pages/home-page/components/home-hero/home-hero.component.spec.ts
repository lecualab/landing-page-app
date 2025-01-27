import { render, screen } from '@testing-library/angular';
import { HomeHeroComponent } from './home-hero.component';

describe('HomeHeroComponent', () => {
  it('should render the hero content', async () => {
    await render(HomeHeroComponent);

    const actual = screen.getByTestId('hero-content');

    expect(actual).toBeVisible();
  });

  it('should render the hero background', async () => {
    await render(HomeHeroComponent);

    const actual = screen.getByTestId('hero-background');

    expect(actual).toBeVisible();
  });
});
