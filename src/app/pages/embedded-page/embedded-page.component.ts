import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentLayoutComponent } from '@app/components/content-layout';
import { EmbeddedRenderComponent } from './components/embedded-render';
import { EmbeddedRenderHeroComponent } from './components/embedded-render-hero';

@Component({
  imports: [
    ContentLayoutComponent,
    EmbeddedRenderComponent,
    EmbeddedRenderHeroComponent,
  ],
  template: `
    <app-embedded-render-hero />
    <app-content-layout>
      <app-embedded-render />
    </app-content-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmbeddedPageComponent {}
