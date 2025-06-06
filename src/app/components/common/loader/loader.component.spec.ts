import { MatProgressSpinnerHarness } from '@angular/material/progress-spinner/testing';
import { getNativeElement } from '@test/utils';
import { aliasedInput, render, screen } from '@testing-library/angular';
import { LoaderSize, LoaderSizeDiameter } from './enums';
import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  it('should render the loader', async () => {
    await render(LoaderComponent);

    const actual = screen.getByTestId('loader');

    expect(actual).toBeVisible();
    expect(actual).toContainElement(screen.getByRole('progressbar'));
  });

  describe('when setting size', () => {
    it('should render the loader with default size', async () => {
      const { fixture } = await render(LoaderComponent);

      const spinnerElement = await getNativeElement(
        fixture,
        MatProgressSpinnerHarness,
      );

      const expectedDiameter = `${LoaderSizeDiameter[LoaderSize.MD]}px`;

      expect(spinnerElement).toHaveStyle(`width: ${expectedDiameter}`);
      expect(spinnerElement).toHaveStyle(`height: ${expectedDiameter}`);
    });

    for (const size of Object.values(LoaderSize)) {
      it(`should render the loader with size ${size}`, async () => {
        const { fixture } = await render(LoaderComponent, {
          inputs: {
            ...aliasedInput('size', size),
          },
        });

        const spinnerElement = await getNativeElement(
          fixture,
          MatProgressSpinnerHarness,
        );

        const expectedDiameter = `${LoaderSizeDiameter[size]}px`;

        expect(spinnerElement).toHaveStyle(`width: ${expectedDiameter}`);
        expect(spinnerElement).toHaveStyle(`height: ${expectedDiameter}`);
      });
    }
  });
});
