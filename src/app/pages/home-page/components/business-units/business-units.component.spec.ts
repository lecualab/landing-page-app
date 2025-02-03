import { DeferBlockState } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { BusinessUnitsComponent } from './business-units.component';
import { BusinessUnitService } from './data-access/business-unit';
import { BusinessUnitDto } from './data-access/business-unit/dtos';
import { CommitmentService } from './data-access/commitment';

describe('BusinessUnitsComponent', () => {
  let businessUnitService: jasmine.SpyObj<BusinessUnitService>;
  let commitmentService: jasmine.SpyObj<CommitmentService>;

  beforeEach(() => {
    businessUnitService = jasmine.createSpyObj<BusinessUnitService>({
      $hasValue: true,
      $businessUnits: [],
    });

    commitmentService = jasmine.createSpyObj<CommitmentService>({
      $hasValue: true,
      $commitment: {} as any,
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
        { provide: CommitmentService, useValue: commitmentService },
      ],
      deferBlockStates: DeferBlockState.Complete,
    });

    const actual = screen.getAllByTestId('business-unit-card');

    expect(actual).toHaveSize(expected.length);
  });

  it('should show the commitment', async () => {
    await render(BusinessUnitsComponent, {
      providers: [
        { provide: BusinessUnitService, useValue: businessUnitService },
        { provide: CommitmentService, useValue: commitmentService },
      ],
      deferBlockStates: DeferBlockState.Complete,
    });

    const actual = screen.getByTestId('commitment');

    expect(actual).toBeVisible();
  });

  describe('when commitment is loading', () => {
    beforeEach(() => {
      commitmentService.$hasValue.and.returnValue(false);
    });

    it('should show a loader', async () => {
      await render(BusinessUnitsComponent);

      const actual = screen.getByTestId('commitment-loader');

      expect(actual).toBeVisible();
    });
  });

  describe('when business units are loading', () => {
    beforeEach(() => {
      businessUnitService.$hasValue.and.returnValue(false);
    });

    it('should show the loader', async () => {
      await render(BusinessUnitsComponent);

      const actual = screen.getAllByTestId('business-unit-card-loader');

      expect(actual).toHaveSize(3);
    });
  });
});
