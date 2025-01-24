import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslatePipe } from '@ngx-translate/core';
import { LinkComponent } from '../common/link';
import { ContentLayoutComponent } from '../content-layout';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbarModule,
    LinkComponent,
    TranslatePipe,
    LinkComponent,
    ContentLayoutComponent,
  ],
  template: `
    <div class="toolbar-background absolute z-100 w-full pt-2 lg:pt-3">
      <app-content-layout>
        <mat-toolbar data-testid="toolbar">
          <app-link
            data-testid="project-name"
            href="/"
            noStyle
            class="font-medium lg:text-3xl"
          >
            <div class="flex items-center gap-x-3">
              <img
                src="media/icons/logo.svg"
                alt="Lecualab's logo"
                class="h-8 lg:h-12"
              />
              <h3>{{ 'project.name' | translate }}</h3>
            </div>
          </app-link>
          <div class="flex-auto"></div>
          <app-link href="/contact" icon="mail" noStyle />
        </mat-toolbar>
      </app-content-layout>
    </div>
  `,
  styles: `
    @use '@angular/material' as mat;

    :host {
      @include mat.toolbar-overrides(
        (
          container-text-color: white,
          container-background-color: transparent,
        )
      );
    }

    .toolbar-background {
      background-image: linear-gradient(
        180deg,
        rgba(27, 27, 27, 0.49) 5.62%,
        rgba(27, 27, 27, 0) 100%
      );
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {}
