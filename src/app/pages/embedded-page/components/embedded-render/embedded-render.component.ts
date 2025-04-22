import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { injectRouteData } from '@app/utils/injectors';
import { SeoService } from '@app/utils/seo';
import { EmbeddedRenderDto } from './data-access/embedded-render';
import { EmbeddedViewComponent } from './ui/embedded-view';

@Component({
  selector: 'app-embedded-render',
  imports: [EmbeddedViewComponent],
  template: `
    <section>
      @if ($embeddedRender(); as embeddedRender) {
        <app-embedded-view [renderHtml]="embeddedRender.renderHtmlBase64" />
      }
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmbeddedRenderComponent {
  readonly #seoService = inject(SeoService);
  protected readonly $embeddedRender =
    injectRouteData<EmbeddedRenderDto>('embeddedRender');

  constructor() {
    effect(() => {
      const embeddedRender = this.$embeddedRender();

      if (!embeddedRender) return;

      this.#seoService.updateMetaTags({
        title: embeddedRender.name,
        description: embeddedRender.description,
        keywords: embeddedRender.keywords,
      });
    });
  }
}
