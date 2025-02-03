import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LecualinaAnimationComponent } from '@app/components/common/lecualina-animation';
import { SkeletonComponent } from '@app/components/common/skeleton';
import { TranslatePipe } from '@ngx-translate/core';
import { BusinessUnitService } from './data-access/business-unit';
import { BusinessUnitCardComponent } from './ui/business-unit-card';
import { CommitmentComponent } from './ui/commitment';

@Component({
  selector: 'app-business-units',
  imports: [
    SkeletonComponent,
    BusinessUnitCardComponent,
    TranslatePipe,
    LecualinaAnimationComponent,
    CommitmentComponent,
  ],
  template: `
    <section class="gap my-16 grid gap-y-4">
      <h2 class="mb-6 text-center text-4xl font-semibold tracking-wide">
        {{ 'home.businessUnits.title' | translate }}
      </h2>
      <div
        class="mb-8 grid gap-5 sm:grid-cols-2 lg:has-hover:*:not-hover:scale-97 lg:has-hover:*:not-hover:grayscale xl:grid-cols-4"
      >
        @if (!businessUnitService.$isLoading()) {
          @for (
            businessUnit of businessUnitService.$businessUnits();
            track businessUnit.id
          ) {
            <app-business-unit-card
              [businessUnit]="businessUnit"
              class="transition-all lg:hover:scale-103 lg:hover:grayscale-0"
            />
          }
        } @else {
          @for (i of [1, 2, 3, 4]; track i) {
            <div class="h-88 w-full">
              <app-skeleton
                data-testid="business-unit-card-loader"
                height="full"
              />
            </div>
          }
        }
      </div>

      <app-lecualina-animation class="m-auto lg:hidden" />
      <app-commitment />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessUnitsComponent {
  protected readonly businessUnitService = inject(BusinessUnitService);
}
