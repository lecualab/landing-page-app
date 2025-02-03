import { computed, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { delay, of, tap } from 'rxjs';
import { CommitmentDto } from './dtos';

@Injectable({ providedIn: 'root' })
export class CommitmentService {
  readonly #commitementResource = rxResource({
    loader: () =>
      of<CommitmentDto>({
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.',
      }).pipe(
        delay(100),
        tap(() => {
          console.info('Commitment loaded...');
        }),
      ),
  });

  readonly $commitment = this.#commitementResource.value;
  readonly $hasValue = computed(() => this.#commitementResource.hasValue());
}
