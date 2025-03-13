import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentLayoutComponent } from '@app/components/content-layout';
import { BrandsComponent } from './components/brands';
import { BusinessUnitsComponent } from './components/business-units';
import { HomeHeroComponent } from './components/home-hero';
import { VisionStatementComponent } from './components/vision-statement';

@Component({
  imports: [
    HomeHeroComponent,
    VisionStatementComponent,
    ContentLayoutComponent,
    BusinessUnitsComponent,
    BrandsComponent,
  ],
  template: `
    <app-home-hero />
    <app-content-layout>
      <app-vision-statement />
      <app-business-units />
      <div class="m-auto h-0.5 w-full max-w-2xl bg-light-gray"></div>
      <app-brands />
    </app-content-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}
