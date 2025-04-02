import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Base64Pipe } from '@app/utils/pipes/base64';
import { SafeHtmlPipe } from '@app/utils/pipes/safe-html';
import { EmbeddedRenderDto } from '../../data-access/embedded-render';
import { RunScriptsDirective } from './run-scripts.directive';

@Component({
  selector: 'app-embedded-view',
  imports: [Base64Pipe, SafeHtmlPipe, RunScriptsDirective],
  template: `
    <div [innerHTML]="$renderHtml() | base64 | safeHtml" appRunScripts></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmbeddedViewComponent {
  readonly $renderHtml = input.required<EmbeddedRenderDto['renderHtmlBase64']>({
    alias: 'renderHtml',
  });
}
