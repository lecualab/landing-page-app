import { aliasedInput, render, screen } from '@testing-library/angular';
import { HeroBackgroundComponent } from './hero-background.component';

describe('HeroBackgroundComponent', () => {
  it('should show the background image', async () => {
    const expected = 'background-image-url';

    await render(HeroBackgroundComponent, {
      inputs: {
        ...aliasedInput('backgroundImageUrl', expected),
      },
    });

    const actual = screen.getByRole('img');

    expect(actual).toBeVisible();
    expect(actual).toHaveAttribute('src', expected);
  });
});
