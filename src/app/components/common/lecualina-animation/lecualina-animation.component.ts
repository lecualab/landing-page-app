import { ChangeDetectionStrategy, Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, timer } from 'rxjs';

const BASE_IMAGE_PATH = 'media/icons/lecualina';
const LECUALINA_IMAGES = [
  'lecualina-base.svg',
  'lecualina-check.svg',
  'lecualina-hi.svg',
];

@Component({
  selector: 'app-lecualina-animation',
  template: `
    <picture data-testid="lecualina-animation" class="select-none">
      <img
        [src]="$currentLecualinaImage()"
        alt="Greeting from Lecualina"
        class="size-40 lg:size-50"
      />
    </picture>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LecualinaAnimationComponent {
  protected readonly $currentLecualinaImage = toSignal(
    timer(0, 1110).pipe(
      map((i) => i % LECUALINA_IMAGES.length),
      map((nextIndex) => LECUALINA_IMAGES[nextIndex]),
      map((imageName) => `${BASE_IMAGE_PATH}/${imageName}`),
    ),
    { initialValue: `${BASE_IMAGE_PATH}/${LECUALINA_IMAGES[0]}` },
  );
}
