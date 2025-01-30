import { aliasedInput, render, screen } from '@testing-library/angular';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  it('should render the button using the provided text', async () => {
    const expected = 'title';

    await render(`<app-button>${expected}</app-button>`, {
      imports: [ButtonComponent],
    });

    const actual = screen.getByRole('button');

    expect(actual).toBeVisible();
    expect(actual).toHaveTextContent(expected);
  });

  describe('when disabled', () => {
    it('should disable the button', async () => {
      await render(ButtonComponent, {
        inputs: {
          ...aliasedInput('disabled', true),
        },
      });

      const actual = screen.getByRole('button');

      expect(actual).toBeDisabled();
    });
  });

  describe('when icon is provided', () => {
    it('should show the icon', async () => {
      const expected = 'icon';

      await render(ButtonComponent, {
        inputs: {
          ...aliasedInput('icon', expected),
        },
      });

      const actual = screen.getByRole('button');

      expect(actual).toHaveTextContent(expected);
    });
  });

  describe('when loading', () => {
    it('should show the loader', async () => {
      await render(ButtonComponent, {
        inputs: {
          ...aliasedInput('isLoading', true),
        },
      });

      const actual = screen.getByTestId('loader');

      expect(actual).toBeVisible();
    });
  });
});
