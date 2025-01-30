import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LinkComponent } from '@app/components/common/link';
import { SkeletonComponent } from '@app/components/common/skeleton';
import { TranslatePipe } from '@ngx-translate/core';
import { VisionStatementService } from './data-access';

@Component({
  selector: 'app-vision-statement',
  imports: [MatIconModule, LinkComponent, SkeletonComponent, TranslatePipe],
  template: `
    <section
      data-testid="vision-statement"
      class="relative z-20 -mt-12 rounded-md bg-white p-8 shadow-lg lg:grid lg:min-h-78 lg:grid-cols-3 lg:items-center lg:gap-x-14"
    >
      @defer (when visionStatementService.$hasValue()) {
        @let visionStatement = visionStatementService.$visionStatement()!;

        <h2
          data-testid="vision-statement-title"
          class="mb-4 text-3xl lg:text-right xl:text-4xl"
        >
          {{ visionStatement.title }}
        </h2>
        <div
          data-testid="vision-statement-content"
          class="space-y-4 opacity-40 lg:text-lg xl:text-xl"
        >
          <p>{{ visionStatement.content }}</p>
        </div>
        <div
          class="mt-6 lg:mt-0 lg:flex lg:flex-col lg:items-center lg:gap-y-5 lg:justify-self-center"
        >
          <div class="hidden lg:block">
            <div class="grid h-40 w-50 place-items-center bg-dark-gray">
              <p class="text-center text-white">
                Here comes a LecuaDuck image :)
              </p>
            </div>
          </div>
          <app-link
            data-testid="vision-statement-action"
            href="/contact"
            icon="arrow_forward"
          >
            {{ 'home.visionStatement.action' | translate }}
          </app-link>
        </div>
      } @placeholder (minimum 1000ms) {
        <app-skeleton height="sm" />
        <app-skeleton height="lg" />
        <app-skeleton />
      }
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisionStatementComponent {
  protected readonly visionStatementService = inject(VisionStatementService);
}
