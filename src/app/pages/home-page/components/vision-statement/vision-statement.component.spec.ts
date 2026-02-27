import { render, screen } from '@testing-library/angular';
import { VisionStatementComponent } from './vision-statement.component';

describe('VisionStatementComponent', () => {
  it('should render the vision statement title', async () => {
    await render(VisionStatementComponent);

    const actual = screen.queryByTestId('vision-statement-title');

    expect(actual).toBeVisible();
    expect(actual).toHaveTextContent(/visionStatement.title$/);
  });

  it('should render the vision statement message', async () => {
    await render(VisionStatementComponent);

    const actual = screen.queryByTestId('vision-statement-message');

    expect(actual).toBeVisible();
    expect(actual).toHaveTextContent(/visionStatement.message$/);
  });

  it('should render the vision statement action', async () => {
    await render(VisionStatementComponent);

    const actual = screen.queryByTestId('vision-statement-action');

    expect(actual).toBeVisible();
    expect(actual).toHaveAttribute('href', '/contact');
    expect(actual).toHaveTextContent(/visionStatement.action$/);
  });

  // INFO: This test is to-do because I don't know how to simulate large screens in the testing environment.
  it.todo(
    'should render the lecualina animation on large screens',
    async () => {
      await render(VisionStatementComponent);

      const actual = screen.queryByTestId('lecualina-animation');

      expect(actual).toBeVisible();
    },
  );
});
