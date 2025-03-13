import { httpResource } from '@angular/common/http';
import { computed, Injectable } from '@angular/core';
import { StandardizedResponseDto } from '@app/utils/dtos';
import { environment } from '@environment';
import { BrandDto } from './dtos';

@Injectable({ providedIn: 'root' })
export class BrandsService {
  readonly #brandsResource = httpResource<
    StandardizedResponseDto<readonly BrandDto[]>
  >(`${environment.apiUrl}/v1/brands`, {
    defaultValue: { data: [] },
  });

  readonly $brands = computed(() => this.#brandsResource.value().data);
  readonly $isLoading = this.#brandsResource.isLoading;
}
