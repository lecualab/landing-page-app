import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LecualinaAnimationComponent } from '@app/components/common/lecualina-animation';
import { SkeletonComponent } from '@app/components/common/skeleton';
import { TranslatePipe } from '@ngx-translate/core';
import { BusinessUnitService } from './data-access/business-unit';
import { BusinessUnitCardComponent } from './ui/business-unit-card';

@Component({
  selector: 'app-business-units',
  imports: [
    SkeletonComponent,
    BusinessUnitCardComponent,
    TranslatePipe,
    LecualinaAnimationComponent,
  ],
  template: `
    <section class="gap my-16 grid gap-y-4">
      <h2 class="mb-6 text-center text-4xl font-semibold tracking-wide">
        {{ 'home.businessUnits.title' | translate }}
      </h2>
      <div class="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        @defer (when businessUnitService.$hasValue()) {
          @for (
            businessUnit of businessUnitService.$businessUnits();
            track businessUnit.id
          ) {
            <app-business-unit-card
              [businessUnit]="businessUnit"
              class="sm:first:col-span-full lg:first:col-span-1"
            />
          }
        } @placeholder {
          @for (i of [1, 2, 3]; track i) {
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

      <div data-testid="commitment" class="mt-6 flex justify-center px-2">
        <p
          class="max-w-xl text-center text-2xl font-light tracking-wide text-pretty lg:max-w-3xl lg:tracking-wider"
        >
          {{ 'home.businessUnits.commitment' | translate }}
        </p>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessUnitsComponent {
  protected readonly businessUnitService = inject(BusinessUnitService);
}
