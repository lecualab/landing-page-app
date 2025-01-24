import { render, screen } from '@testing-library/angular';
import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  it('should display project name', async () => {
    await render(ToolbarComponent);

    const actual = screen.getByTestId('project-name');

    expect(actual).toHaveTextContent('project.name');
  });
});
