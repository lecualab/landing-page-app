import { Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { BusinessUnitDto } from './dtos';

@Injectable({ providedIn: 'root' })
export class BusinessUnitService {
  readonly #businessUnitsResource = rxResource({
    defaultValue: [],
    loader: () =>
      of<readonly BusinessUnitDto[]>([
        {
          id: 1,
          name: 'Diseño corporativo',
          imageUrl: 'media/images/business-units/corporative-design.webp',
          description:
            'Tarjetas de presentación, pendones, afiches, slides y mailing; enfocado en mejorar tu comunicación interna',
        },
        {
          id: 2,
          name: 'Branding',
          imageUrl: 'media/images/business-units/branding.webp',
          description:
            'Logos, identidad corporativa, manuales de marca y diseño de packaging para que tu marca se posicione en el mercado',
        },
        {
          id: 3,
          name: 'Diseño gráfico',
          imageUrl: 'media/images/business-units/graphic-design.webp',
          description:
            'Banners digitales, anuncios para redes sociales y palomas publicitarias para que tu imagen destaque',
        },
        {
          id: 4,
          name: 'Diseño editorial',
          imageUrl: 'media/images/business-units/editorial-design.webp',
          description:
            'Memorias, informes, catálogos, revistas y libros que marquen tu huella empresarial',
        },
      ]),
  });

  readonly $businessUnits = this.#businessUnitsResource.value;
  readonly $isLoading = this.#businessUnitsResource.isLoading;
}
