import { createMock } from '@golevelup/ts-vitest';
import { render, screen } from '@testing-library/angular';
import type { MockedObject } from 'vitest';
import { BrandsComponent } from './brands.component';
import { BrandsService } from './data-access/brands';
import { BrandDto } from './data-access/brands/dtos';

describe('BrandsComponent', () => {
  let brandsService: MockedObject<BrandsService>;

  beforeEach(() => {
    brandsService = createMock<BrandsService>({
      $isLoading: () => false,
    });
  });

  it('should show all brands', async () => {
    const expected: readonly BrandDto[] = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      name: `Brand ${i}`,
      imageUrl: `https://example.com/brand-${i}.png`,
    }));

    brandsService.$brands.mockReturnValue(expected);

    await render(BrandsComponent, {
      providers: [{ provide: BrandsService, useValue: brandsService }],
    });

    const images = screen.getAllByRole('img');

    expected.forEach(({ imageUrl }) => {
      const actual = images.find((img) => img.getAttribute('src') === imageUrl);

      expect(actual).toBeVisible();
    });
  });

  it('should show the title', async () => {
    await render(BrandsComponent, {
      providers: [{ provide: BrandsService, useValue: brandsService }],
    });

    const actual = screen.getByRole('heading', {
      level: 3,
      name: /brands.title$/,
    });

    expect(actual).toBeVisible();
  });
});
