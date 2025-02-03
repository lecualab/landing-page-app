import { aliasedInput, render, screen } from '@testing-library/angular';
import { CommitmentDto } from '../../data-access/commitment/dtos';
import { CommitmentComponent } from './commitment.component';

describe('CommitmentComponent', () => {
  it('should show the commitment message', async () => {
    const expected = 'message';

    await render(CommitmentComponent, {
      inputs: {
        ...aliasedInput('commitment', {
          message: expected as any,
        } as CommitmentDto),
      },
    });

    const actual = screen.getByTestId('commitment');

    expect(actual).toBeVisible();
    expect(actual).toHaveTextContent(expected);
  });
});
