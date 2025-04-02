import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  readonly #sanitizer = inject(DomSanitizer);

  transform(html: string) {
    // eslint-disable-next-line sonarjs/no-angular-bypass-sanitization
    return this.#sanitizer.bypassSecurityTrustHtml(html);
  }
}
