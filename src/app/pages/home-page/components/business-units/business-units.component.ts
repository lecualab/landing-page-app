import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SkeletonComponent } from '@app/components/common/skeleton';
import { TranslatePipe } from '@ngx-translate/core';
import { BusinessUnitService } from './data-access/business-unit';
import { CommitmentService } from './data-access/commitment';
import { BusinessUnitCardComponent } from './ui/business-unit-card';
import { CommitmentComponent } from './ui/commitment';

@Component({
  selector: 'app-business-units',
  imports: [
    CommitmentComponent,
    SkeletonComponent,
    BusinessUnitCardComponent,
    TranslatePipe,
  ],
  template: `
    <section class="gap my-16 grid gap-y-4">
      <h2 class="mb-6 text-center text-4xl font-semibold tracking-wide">
        {{ 'home.businessUnits.title' | translate }}
      </h2>
      <div
        class="mb-8 grid place-items-center gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
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
        } @placeholder (minimum 1000ms) {
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

      @defer (when commitmentService.$hasValue()) {
        <app-commitment [commitment]="commitmentService.$commitment()!" />
      } @placeholder (minimum 1000ms) {
        <app-skeleton data-testid="commitment-loader" height="lg" />
      }
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessUnitsComponent {
  protected readonly businessUnitService = inject(BusinessUnitService);
  protected readonly commitmentService = inject(CommitmentService);
}
