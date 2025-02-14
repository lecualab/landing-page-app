import { aliasedInput, render, screen } from '@testing-library/angular';
import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  it('should display the hero title', async () => {
    const expected = 'title';

    await render(HeroComponent, {
      inputs: { ...aliasedInput('title', expected) },
    });

    const actual = screen.getByRole('heading', {
      level: 1,
      name: expected,
    });

    expect(actual).toBeVisible();
  });

  it('should display the default hero background', async () => {
    await render(HeroComponent, {
      inputs: { ...aliasedInput('title', '') },
    });

    const actual = screen.getByTestId('hero-background');

    expect(actual).toBeVisible();
  });

  describe('when the hero background is provided', () => {
    it('should display the provided hero background', async () => {
      const expected = 'background';

      await render(
        `<app-hero title="title"><div slot="background">${expected}</div></app-hero>`,
        { imports: [HeroComponent] },
      );

      const actual = screen.getByText(expected);

      expect(actual).toBeVisible();
    });
  });
});
