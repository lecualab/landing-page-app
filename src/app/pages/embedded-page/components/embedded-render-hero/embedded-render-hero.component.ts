import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from '@app/components/common/hero';
import { injectRouteData } from '@app/utils/injectors';
import { EmbeddedRenderDto } from '../embedded-render';

@Component({
  selector: 'app-embedded-render-hero',
  imports: [HeroComponent],
  template: `<app-hero [title]="$embeddedRender()?.name ?? ''" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmbeddedRenderHeroComponent {
  protected readonly $embeddedRender =
    injectRouteData<EmbeddedRenderDto>('embeddedRender');
}
