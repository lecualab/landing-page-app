import { aliasedInput, render, screen } from '@testing-library/angular';
import { BusinessUnitDto } from '../../data-access/business-unit/dtos';
import { BusinessUnitCardComponent } from './business-unit-card.component';

describe('BusinessUnitCardComponent', () => {
  it('should display card name', async () => {
    const expected = 'title';

    await render(BusinessUnitCardComponent, {
      inputs: {
        ...aliasedInput('businessUnit', {
          name: expected as any,
          imageUrl: 'image-url' as any,
        } as BusinessUnitDto),
      },
    });

    const actual = screen.getByRole('heading', { name: expected, level: 3 });

    expect(actual).toBeVisible();
  });

  it('should display card description', async () => {
    const expected = 'description';

    await render(BusinessUnitCardComponent, {
      inputs: {
        ...aliasedInput('businessUnit', {
          description: expected as any,
          imageUrl: 'image-url' as any,
        } as BusinessUnitDto),
      },
    });

    const actual = screen.getByTestId('business-unit-card-description');

    expect(actual).toHaveTextContent(expected);
  });

  it('should display card image', async () => {
    const expected = 'image-url';

    await render(BusinessUnitCardComponent, {
      inputs: {
        ...aliasedInput('businessUnit', {
          imageUrl: expected as any,
        } as BusinessUnitDto),
      },
    });

    const actual = screen.getByRole('img');

    expect(actual).toBeVisible();
    expect(actual).toHaveAttribute('src', expected);
  });
});
