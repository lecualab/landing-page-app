import { aliasedInput, render, screen } from '@testing-library/angular';
import { SkeletonHeight } from './enums';
import { SkeletonComponent } from './skeleton.component';

describe('SkeletonComponent', () => {
  it('should display the skeleton', async () => {
    await render(SkeletonComponent);

    const actual = screen.getByRole('progressbar');

    expect(actual).toBeVisible();
  });

  describe('when count is provided', () => {
    for (const expected of [1, 2, 5, 10]) {
      it(`should display the skeleton ${expected} times`, async () => {
        await render(SkeletonComponent, {
          inputs: {
            ...aliasedInput('count', expected),
          },
        });
        const actual = screen.getAllByRole('progressbar');

        expect(actual).toHaveLength(expected);
      });
    }

    describe('when count is lower than 1', () => {
      it('should display the skeleton 1 time', async () => {
        await render(SkeletonComponent, {
          inputs: {
            ...aliasedInput('count', 0),
          },
        });

        const actual = screen.getAllByRole('progressbar');

        expect(actual).toHaveLength(1);
      });
    });
  });

  describe('when height is provided', () => {
    describe('when height is full', () => {
      for (const count of [1, 2, 5, 10]) {
        describe(`when count is ${count}`, () => {
          it('should display the skeleton once', async () => {
            await render(SkeletonComponent, {
              inputs: {
                ...aliasedInput('count', count),
                ...aliasedInput('height', SkeletonHeight.FULL),
              },
            });
            const actual = screen.getAllByRole('progressbar');

            expect(actual).toHaveLength(1);
          });
        });
      }
    });
  });
});
