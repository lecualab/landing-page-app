import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BusinessUnitDto } from '../../data-access/business-unit/dtos';

@Component({
  selector: 'app-business-unit-card',
  template: `
    @let businessUnit = $businessUnit();

    <div
      data-testid="business-unit-card"
      class="@container relative isolate h-90 overflow-hidden rounded-md bg-dark-gray md:h-76 xl:h-108"
    >
      <picture class="absolute inset-0">
        <img
          [src]="businessUnit.imageUrl"
          [alt]="businessUnit.name"
          class="h-full w-full object-cover"
        />
      </picture>
      <div
        class="absolute h-full w-full bg-gradient-to-b from-transparent from-20% to-black @sm:from-30%"
      ></div>
      <div
        class="absolute z-10 flex h-full flex-col justify-end gap-y-3 p-4 text-white"
      >
        <h3 class="text-3xl font-medium">
          {{ businessUnit.name }}
        </h3>
        <p
          data-testid="business-unit-card-description"
          class="min-h-25 font-light text-pretty @sm:min-h-18"
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
