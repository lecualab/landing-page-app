import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentLayoutComponent } from '@app/components/content-layout';
import { SeoService } from '@app/utils/seo';
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
export class HomePageComponent {
  readonly #seoService = inject(SeoService);

  constructor() {
    this.#seoService.updateMetaTags({
      title: 'home.meta.title',
      description: 'home.meta.description',
      keywords: [
        'agencia de diseño gráfico para empresas',
        'branding corporativo chile',
        'diseño gráfico corporativo profesional',
        'estudio de branding y comunicación visual',
        'diseño editorial para empresas',
        'agencia de diseño gráfico para comunicación interna',
        'diseño gráfico estratégico para empresas',
        'empresa de diseño corporativo con enfoque en recursos humanos',
      ],
    });
  }
}
