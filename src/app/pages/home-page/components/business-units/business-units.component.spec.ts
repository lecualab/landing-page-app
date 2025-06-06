import { render, screen } from '@testing-library/angular';
import { BusinessUnitsComponent } from './business-units.component';
import { BusinessUnitService } from './data-access/business-unit';
import { BusinessUnitDto } from './data-access/business-unit/dtos';

describe('BusinessUnitsComponent', () => {
  let businessUnitService: jasmine.SpyObj<BusinessUnitService>;

  beforeEach(() => {
    businessUnitService = jasmine.createSpyObj<BusinessUnitService>({
      $isLoading: false,
      $businessUnits: [],
    });
  });

  it('should show a header', async () => {
    await render(BusinessUnitsComponent);

    const actual = screen.getByRole('heading', {
      level: 2,
      name: /businessUnits.title/,
    });

    expect(actual).toBeVisible();
  });

  it('should show business units', async () => {
    const expected = [
      { imageUrl: 'image-url-1' } as BusinessUnitDto,
      { imageUrl: 'image-url-2' } as BusinessUnitDto,
    ];

    businessUnitService.$businessUnits.and.returnValue(expected);

    await render(BusinessUnitsComponent, {
      providers: [
        { provide: BusinessUnitService, useValue: businessUnitService },
      ],
    });

    const actual = screen.getAllByTestId('business-unit-card');

    expect(actual).toHaveSize(expected.length);
  });

  it('should show the commitment', async () => {
    await render(BusinessUnitsComponent);

    const actual = screen.getByTestId('commitment');

    expect(actual).toBeVisible();
    expect(actual).toHaveTextContent(/businessUnits.commitment$/);
  });

  // INFO: This test is skipped because I don't know how to include `TailwindCSS` in the test environment.
  xit('should show the lecualina animation', async () => {
    await render(BusinessUnitsComponent);

    const actual = screen.getByTestId('lecualina-animation');

    expect(actual).toBeVisible();
  });

  describe('when business units are loading', () => {
    beforeEach(() => {
      businessUnitService.$isLoading.and.returnValue(true);
    });

    it('should show the loader', async () => {
      await render(BusinessUnitsComponent);

      const actual = screen.getAllByTestId('business-unit-card-loader');

      expect(actual.length).toBeGreaterThanOrEqual(2);
    });
  });
});
