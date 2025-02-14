import { aliasedInput, render, screen } from '@testing-library/angular';
import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  it('should display the hero image', async () => {
    const expected = 'image-url';

    await render(HeroComponent, {
      inputs: {
        ...aliasedInput('image', expected),
      },
    });

    const actual = screen.getByRole('img');

    expect(actual).toBeVisible();
    expect(actual).toHaveAttribute('src', expected);
  });

  it('should set the hero image alt', async () => {
    const expected = 'image-alt';

    await render(HeroComponent, {
      inputs: {
        ...aliasedInput('image', 'image'),
        ...aliasedInput('imageAlt', expected),
      },
    });

    const actual = screen.getByRole('img');

    expect(actual).toHaveAttribute('alt', expected);
  });

  it('should display the hero title', async () => {
    const expected = 'title';

    await render(HeroComponent, {
      inputs: {
        ...aliasedInput('image', 'image'),
        ...aliasedInput('title', expected),
      },
    });
    const actual = screen.getByRole('heading', {
      level: 1,
      name: expected,
    });

    expect(actual).toBeVisible();
  });

  describe('when the image alt is not provided', () => {
    describe('when the title is provided', () => {
      it('should display the title as image alt', async () => {
        const expected = 'title';

        await render(HeroComponent, {
          inputs: {
            ...aliasedInput('image', 'image'),
            ...aliasedInput('title', expected),
          },
        });

        const actual = screen.getByRole('img');

        expect(actual).toHaveAttribute('alt', expected);
      });

      describe('when the title is not provided', () => {
        it('should display the default image alt', async () => {
          await render(HeroComponent, {
            inputs: {
              ...aliasedInput('image', 'image'),
            },
          });

          const actual = screen.getByRole('img');

          expect(actual).toHaveAttribute('alt', jasmine.notEmpty());
        });
      });
    });
  });

  describe('when the title is not provided', () => {
    it('should not display the title', async () => {
      await render(HeroComponent, {
        inputs: {
          ...aliasedInput('image', 'image'),
        },
      });

      const actual = screen.queryByRole('heading', { level: 1 });

      expect(actual).toBeNull();
    });
  });
});
