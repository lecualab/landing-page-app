import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { LinkComponent } from './link.component';

describe('LinkComponent', () => {
  it('should show the provided text', async () => {
    const expected = 'title';

    await render(`<app-link href="">${expected}</app-link>`, {
      imports: [LinkComponent],
    });

    const actual = screen.getByTestId('link');

    expect(actual).toBeVisible();
    expect(actual).toHaveTextContent(expected);
  });

  for (const expected of [
    '/',
    '/link',
    'http://example.com',
    'https://example.com',
  ]) {
    it(`should link to the provided href: ${expected}`, async () => {
      await render(`<app-link href="${expected}"/>`, {
        imports: [LinkComponent],
      });

      const actual = screen.getByTestId('link');

      expect(actual).toHaveAttribute('href', expected);
    });
  }

  describe('when clicked', () => {
    let scrollToSpy: jasmine.SpyObj<Window['scrollTo']>;
    let actualScrollTo: Window['scrollTo'];

    beforeEach(() => {
      // @ts-expect-error - Testing purposes
      actualScrollTo = document.defaultView?.scrollTo;
      scrollToSpy = jasmine.createSpy('scrollTo');

      if (document.defaultView) document.defaultView.scrollTo = scrollToSpy;
    });

    afterEach(() => {
      if (document.defaultView) document.defaultView.scrollTo = actualScrollTo;
    });

    it('should scroll to top', async () => {
      await render(`<app-link href="/"/>`, {
        imports: [LinkComponent],
      });

      await userEvent.click(screen.getByTestId('link'));

      // @ts-expect-error - Overloaded function
      expect(scrollToSpy).toHaveBeenCalledWith({
        top: 0,
        left: 0,
        behavior: 'smooth',
      } satisfies ScrollToOptions);
    });

    describe('when href is external', () => {
      it('should not scroll to top', async () => {
        await render(`<app-link href="http://example.com"/>`, {
          imports: [LinkComponent],
        });

        await userEvent.click(screen.getByTestId('link'));

        expect(scrollToSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('when disabled', () => {
    it('should disable the link', async () => {
      await render(`<app-link href="" disabled/>`, {
        imports: [LinkComponent],
      });

      const actual = screen.getByTestId('link');

      expect(actual).toHaveAttribute('disabled');
    });
  });

  describe('when icon is provided', () => {
    it('should show the icon', async () => {
      const expected = 'icon';

      await render(`<app-link href="" icon="${expected}"/>`, {
        imports: [LinkComponent],
      });

      const actual = screen.getByTestId('link');

      expect(actual).toHaveTextContent(expected);
    });
  });

  describe('when noStyle is provided', () => {
    it('should not apply any styles', async () => {
      await render(`<app-link href="" noStyle/>`, {
        imports: [LinkComponent],
      });

      const actual = screen.getByTestId('link');

      expect(actual).not.toHaveAttribute('mat-fab');
      expect(actual).not.toHaveAttribute('extended');
    });

    it('should show the content', async () => {
      const expected = 'title';

      await render(`<app-link href="" noStyle>${expected}</app-link>`, {
        imports: [LinkComponent],
      });

      const actual = screen.getByTestId('link');

      expect(actual).toHaveTextContent(expected);
    });
  });
});
