import { render, screen } from '@testing-library/angular';
import { CommitmentComponent } from './commitment.component';

describe('CommitmentComponent', () => {
  it('should display the commitment', async () => {
    await render(CommitmentComponent);

    const actual = screen.getByRole('blockquote');

    expect(actual).toBeVisible();
    expect(actual).toHaveTextContent(/businessUnits.commitment$/);
  });

  it('should display the quoute icon', async () => {
    await render(CommitmentComponent);

    const actual = screen.getByRole('img', { hidden: true });

    expect(actual).toBeVisible();
  });
});
