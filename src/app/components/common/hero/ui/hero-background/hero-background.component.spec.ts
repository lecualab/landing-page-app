import { render, screen } from '@testing-library/angular';
import { HeroBackgroundComponent } from './hero-background.component';

describe('HeroBackgroundComponent', () => {
  it('should show the waves', async () => {
    await render(HeroBackgroundComponent);

    const actual = screen.getByTestId('hero-background');

    expect(actual).toBeVisible();
  });
});
