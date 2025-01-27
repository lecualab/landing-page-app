import { aliasedInput, render, screen } from '@testing-library/angular';
import { HeroContentDto } from './dtos';
import { HeroContentComponent } from './hero-content.component';

describe('HeroContentComponent', () => {
  it('should show the title', async () => {
    const expected = 'title';

    await render(HeroContentComponent, {
      inputs: {
        ...aliasedInput('hero', {
          title: expected as any,
        } as HeroContentDto),
      },
    });

    const actual = screen.getByTestId('hero-title');

    expect(actual).toBeVisible();
    expect(actual).toHaveTextContent(expected);
  });

  it('should show the subtitle', async () => {
    const expected = 'subtitle';

    await render(HeroContentComponent, {
      inputs: {
        ...aliasedInput('hero', {
          subtitle: expected as any,
        } as HeroContentDto),
      },
    });

    const actual = screen.getByTestId('hero-subtitle');

    expect(actual).toBeVisible();
    expect(actual).toHaveTextContent(expected);
  });
});
