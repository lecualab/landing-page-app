import { ChangeDetectionStrategy, Component } from '@angular/core';
import { injectRouteData } from '@app/utils/injectors';
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
  protected readonly $embeddedRender =
    injectRouteData<EmbeddedRenderDto>('embeddedRender');
}
