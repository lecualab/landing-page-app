import { afterNextRender, Directive, ElementRef, inject } from '@angular/core';

@Directive({ selector: 'div[appRunScripts]' })
export class RunScriptsDirective {
  readonly #elementRef = inject<ElementRef<HTMLDivElement>>(ElementRef);

  constructor() {
    afterNextRender({
      earlyRead: () => {
        return this.#elementRef.nativeElement.getElementsByTagName('script');
      },
      write: (scripts) => {
        for (const script of scripts) {
          const scriptCopy = document.createElement('script');
          scriptCopy.type = script.type;
          scriptCopy.async = false;

          if (script.innerHTML) scriptCopy.innerHTML = script.innerHTML;
          else if (script.src) scriptCopy.src = script.src;

          this.#elementRef.nativeElement.replaceChild(scriptCopy, script);
        }
      },
    });
  }
}
