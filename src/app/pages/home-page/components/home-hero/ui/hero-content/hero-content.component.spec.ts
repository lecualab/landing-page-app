import { render, screen } from '@testing-library/angular';
import { HeroContentComponent } from './hero-content.component';

describe('HeroContentComponent', () => {
  it('should show the title', async () => {
    await render(HeroContentComponent);

    const actual = screen.getByTestId('hero-title');

    expect(actual).toBeVisible();
    expect(actual).toHaveTextContent(/hero.title.base$/);
  });
});
