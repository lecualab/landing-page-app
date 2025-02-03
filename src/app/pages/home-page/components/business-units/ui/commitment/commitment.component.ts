import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommitmentDto } from '../../data-access/commitment/dtos';

@Component({
  selector: 'app-commitment',
  template: `
    @let commitment = $commitment();

    <div data-testid="commitment" class="mt-6 px-2">
      <p class="text-center text-2xl font-light tracking-wide text-pretty">
        {{ commitment.message }}
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommitmentComponent {
  readonly $commitment = input.required<CommitmentDto>({ alias: 'commitment' });
}
