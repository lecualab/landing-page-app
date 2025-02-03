import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BusinessUnitDto } from '../../data-access/business-unit/dtos';

@Component({
  selector: 'app-business-unit-card',
  imports: [NgOptimizedImage],
  template: `
    @let businessUnit = $businessUnit();

    <div
      data-testid="business-unit-card"
      class="relative aspect-square overflow-hidden rounded-md px-4 py-8 hover:grayscale-100 sm:aspect-auto sm:h-76 lg:h-108"
    >
      <div class="flex h-full flex-col justify-end gap-y-3 text-white">
        <h3 class="text-3xl font-medium">
          {{ businessUnit.name }}
        </h3>
        <p
          data-testid="business-unit-card-description"
          class="font-light text-pretty"
        >
          {{ businessUnit.description }}
        </p>
      </div>
      <img
        data-testid="business-unit-card-background"
        [ngSrc]="businessUnit.imageUrl"
        [alt]="businessUnit.name"
        class="-z-1"
        fill
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessUnitCardComponent {
  readonly $businessUnit = input.required<BusinessUnitDto>({
    alias: 'businessUnit',
  });
}
