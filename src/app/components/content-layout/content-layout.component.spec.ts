import { render, screen } from '@testing-library/angular';
import { ContentLayoutComponent } from './content-layout.component';

describe('ContentLayoutComponent', () => {
  it('should wrap content', async () => {
    const expected = '<p>content</p>';

    await render(`<app-content-layout>${expected}</app-content-layout>`, {
      imports: [ContentLayoutComponent],
    });

    const actual = screen.getByTestId('content-layout');

    expect(actual).toBeVisible();
    expect(actual).toContainHTML(expected);
  });
});
