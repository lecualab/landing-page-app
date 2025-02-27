import { fakeAsync, tick } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { LecualinaAnimationComponent } from './lecualina-animation.component';

describe('LecualinaAnimationComponent', () => {
  it('should show lecualina image', async () => {
    await render(LecualinaAnimationComponent);

    const actual = screen.getByRole('img');

    expect(actual).toBeVisible();
  });

  it('should alternate between lecualina images', fakeAsync(async () => {
    const AWAITED_TIME = 1_200;
    const getImageSrc = () => screen.getByRole('img').getAttribute('src');

    await render(LecualinaAnimationComponent);

    // INFO: Validate that the image changes every X seconds
    Array.from({ length: 5 }).forEach(() => {
      tick(AWAITED_TIME);
      const base = getImageSrc();
      tick(AWAITED_TIME);
      const actual = getImageSrc();

      expect(actual).not.toEqual(base);
    });
  }));
});
