import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LecualinaAnimationComponent } from '@app/components/common/lecualina-animation';
import { LinkComponent } from '@app/components/common/link';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-vision-statement',
  imports: [
    MatIconModule,
    LinkComponent,
    TranslatePipe,
    LecualinaAnimationComponent,
  ],
  template: `
    <section
      data-testid="vision-statement"
      class="relative z-20 -mt-12 rounded-md bg-white p-8 shadow-lg lg:grid lg:min-h-78 lg:grid-cols-3 lg:items-center lg:gap-x-14"
    >
      <h2
        data-testid="vision-statement-title"
        class="mb-4 text-3xl lg:text-right xl:text-4xl"
      >
        {{ 'home.visionStatement.title' | translate }}
      </h2>
      <div
        data-testid="vision-statement-message"
        class="space-y-4 opacity-40 lg:text-lg xl:text-xl"
      >
        <p>{{ 'home.visionStatement.message' | translate }}</p>
      </div>
      <div
        class="mt-6 lg:mt-0 lg:flex lg:flex-col lg:items-center lg:gap-y-5 lg:justify-self-center"
      >
        <app-link href="/contact" class="hidden lg:block" noStyle>
          <app-lecualina-animation />
        </app-link>
        <app-link
          data-testid="vision-statement-action"
          href="/contact"
          icon="arrow_forward"
        >
          {{ 'home.visionStatement.action' | translate }}
        </app-link>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisionStatementComponent {}
