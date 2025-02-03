import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentLayoutComponent } from '@app/components/content-layout';
import { BusinessUnitsComponent } from './components/business-units';
import { HomeHeroComponent } from './components/home-hero';
import { VisionStatementComponent } from './components/vision-statement';

@Component({
  imports: [
    HomeHeroComponent,
    VisionStatementComponent,
    ContentLayoutComponent,
    BusinessUnitsComponent,
  ],
  template: `
    <app-home-hero />
    <app-content-layout>
      <app-vision-statement />
      <app-business-units />
    </app-content-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}
