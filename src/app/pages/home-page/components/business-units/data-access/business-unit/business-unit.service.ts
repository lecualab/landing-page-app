import { computed, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { delay, of, tap } from 'rxjs';
import { BusinessUnitDto } from './dtos';

@Injectable({ providedIn: 'root' })
export class BusinessUnitService {
  readonly #businessUnitsResource = rxResource({
    loader: () =>
      of<readonly BusinessUnitDto[]>([
        {
          id: 1,
          name: 'Diseño corporativo',
          imageUrl: 'https://sientecinco.cl/content/uploads/creamos17.jpg',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          id: 2,
          name: 'Branding',
          imageUrl: 'https://sientecinco.cl/content/uploads/creamos17.jpg',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          id: 3,
          name: 'Memorias',
          imageUrl: 'https://sientecinco.cl/content/uploads/creamos14.jpg',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
      ]).pipe(
        delay(300),
        tap(() => {
          console.info('Business units loaded...');
        }),
      ),
  });

  readonly $businessUnits = this.#businessUnitsResource.value;
  readonly $hasValue = computed(() => this.#businessUnitsResource.hasValue());
}
