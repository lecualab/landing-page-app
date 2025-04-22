import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentLayoutComponent } from '@app/components/content-layout';
import { SeoService } from '@app/utils/seo';
import { ContactComponent } from './components/contact';
import { ContactHeroComponent } from './components/contact-hero';

@Component({
  imports: [ContactHeroComponent, ContactComponent, ContentLayoutComponent],
  template: `
    <app-contact-hero />
    <app-content-layout>
      <app-contact />
    </app-content-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPageComponent {
  readonly #seoService = inject(SeoService);

  constructor() {
    this.#seoService.updateMetaTags({
      title: 'contact.meta.title',
      description: 'contact.meta.description',
      keywords: [
        'contacto agencia de diseño gráfico',
        'contacto agencia de branding corporativo',
        'solicitar presupuesto branding corporativo',
        'pedir asesoría en diseño gráfico empresarial',
        'formulario de contacto para diseño editorial',
        'contactar agencia de comunicación visual',
        'cómo contactar agencia de branding b2b',
        'contactar estudio de diseño corporativo chile',
      ],
    });
  }
}
