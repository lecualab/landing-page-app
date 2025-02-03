import { computed, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { BusinessUnitDto } from './dtos';

@Injectable({ providedIn: 'root' })
export class BusinessUnitService {
  readonly #businessUnitsResource = rxResource({
    loader: () =>
      of<readonly BusinessUnitDto[]>([
        {
          id: 1,
          name: 'Diseño corporativo',
          imageUrl: '',
          description:
            'Tarjetas de presentación, pendones, afiches, slides y mailing; enfocado en mejorar tu comunicación interna',
        },
        {
          id: 2,
          name: 'Branding',
          imageUrl: '',
          description:
            'Logos, identidad corporativa, manuales de marca y diseño de packaging para que tu marca se posicione en el mercado',
        },
        {
          id: 3,
          name: 'Diseño editorial',
          imageUrl: '',
          description:
            'Memorias, informes, catálogos, revistas y libros que marquen tu huella empresarial',
        },
      ]),
  });

  readonly $businessUnits = this.#businessUnitsResource.value;
  readonly $hasValue = computed(() => this.#businessUnitsResource.hasValue());
}
