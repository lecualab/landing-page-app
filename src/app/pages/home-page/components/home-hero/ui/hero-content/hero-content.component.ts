import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ContentLayoutComponent } from '@app/components/content-layout';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-hero-content',
  imports: [MatIconModule, ContentLayoutComponent, TranslatePipe],
  template: `
    <app-content-layout>
      <div data-testid="hero-content" class="space-y-4">
        <h2
          data-testid="hero-title"
          class="text-3xl font-medium text-pretty text-white md:text-center md:text-5xl/tight"
        >
          {{ 'home.hero.title' | translate }}
        </h2>
      </div>
    </app-content-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroContentComponent {}
