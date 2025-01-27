import { computed, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { delay, of, tap } from 'rxjs';
import { HomeHeroDto } from './dtos/home-hero.dto';

@Injectable({ providedIn: 'root' })
export class HomeHeroService {
  // TODO: Load hero data from the server
  readonly #homeHeroResource = rxResource({
    loader: () =>
      of<HomeHeroDto>({
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        subtitle: 'Lorem ipsum dolor sit amet',
        backgroundImageUrl:
          'https://sientecinco.cl/content/uploads/Banner-Volvo-Siente-Cinco-Arquitectura.jpg',
      }).pipe(
        delay(100),
        tap(() => {
          console.info('Hero data loaded...');
        }),
      ),
  });

  readonly $homeHero = this.#homeHeroResource.value.asReadonly();
  readonly $hasValue = computed(() => this.#homeHeroResource.hasValue());
}
