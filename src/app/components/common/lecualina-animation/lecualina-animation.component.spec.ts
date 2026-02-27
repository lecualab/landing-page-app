import { render, screen } from '@testing-library/angular';
import { LecualinaAnimationComponent } from './lecualina-animation.component';

describe('LecualinaAnimationComponent', () => {
  it('should show lecualina image', async () => {
    await render(LecualinaAnimationComponent);

    const actual = screen.getByRole('img');

    expect(actual).toBeVisible();
  });

  it('should alternate between lecualina images', async () => {
    const getImageSrcAfterAdvanceTimers = async () => {
      const AWAITED_TIME = 1200;

      vi.advanceTimersByTime(AWAITED_TIME);
      await vi.runOnlyPendingTimersAsync();

      return screen.getByRole('img').getAttribute('src');
    };

    vi.useFakeTimers();

    await render(LecualinaAnimationComponent);

    // INFO: Validate that the image changes every X seconds
    for (let i = 0; i < 5; i++) {
      const base = await getImageSrcAfterAdvanceTimers();
      const actual = await getImageSrcAfterAdvanceTimers();

      expect(actual).not.toEqual(base);
    }

    vi.useRealTimers();
  });
});
