import { render, screen } from '@testing-library/angular';
import { ProgressBarComponent } from './progress-bar.component';

describe('ProgressBarComponent', () => {
  it('should show the progress bar', async () => {
    await render(ProgressBarComponent);

    const actual = screen.getByRole('progressbar');

    expect(actual).toBeVisible();
  });
});
