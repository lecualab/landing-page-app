import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BusinessUnitDto } from '../../data-access/business-unit/dtos';

@Component({
  selector: 'app-business-unit-card',
  template: `
    @let businessUnit = $businessUnit();

    <div
      data-testid="business-unit-card"
      class="@container aspect-square overflow-hidden rounded-md bg-dark-gray px-4 py-8 hover:grayscale-100 sm:aspect-auto sm:h-76 lg:h-108"
    >
      <div class="flex h-full flex-col justify-end gap-y-3 text-white">
        <h3 class="text-3xl font-medium">
          {{ businessUnit.name }}
        </h3>
        <p
          data-testid="business-unit-card-description"
          class="min-h-25 font-light text-pretty @sm:min-h-15"
        >
          {{ businessUnit.description }}
        </p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessUnitCardComponent {
  readonly $businessUnit = input.required<BusinessUnitDto>({
    alias: 'businessUnit',
  });
}
