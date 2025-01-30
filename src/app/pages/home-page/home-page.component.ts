import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentLayoutComponent } from '@app/components/content-layout';
import { HomeHeroComponent } from './components/home-hero';
import { VisionStatementComponent } from './components/vision-statement';

@Component({
  imports: [
    HomeHeroComponent,
    VisionStatementComponent,
    ContentLayoutComponent,
  ],
  template: `
    <app-home-hero />
    <app-content-layout>
      <app-vision-statement />
    </app-content-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}
