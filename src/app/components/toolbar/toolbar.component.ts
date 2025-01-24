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
    <div class="absolute z-100 w-full py-2 lg:py-3">
      <app-content-layout>
        <mat-toolbar data-testid="toolbar" class="!px-0">
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
          container-text-color: var(--color-white),
          container-background-color: transparent,
        )
      );
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {}
