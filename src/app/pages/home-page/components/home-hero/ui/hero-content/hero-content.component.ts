import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { ContentLayoutComponent } from '@app/components/content-layout';
import { TypewriterService } from '@app/utils/typewritter';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-content',
  imports: [MatIconModule, ContentLayoutComponent, TranslatePipe],
  template: `
    <app-content-layout>
      <div data-testid="hero-content" class="m-auto lg:max-w-6xl">
        <h1
          data-testid="hero-title"
          [ariaLabel]="'home.hero.title.ariaLabel' | translate"
          class="flex flex-col text-3xl font-medium text-pretty text-white sm:text-center md:text-5xl/tight"
        >
          <span>{{ 'home.hero.title.base' | translate }}</span>
          <span class="typewritten">{{ $typedWord() }}</span>
        </h1>
      </div>
    </app-content-layout>
  `,
  styles: `
    .typewritten::after {
      content: '|';
      animation: typing 0.9s infinite;
    }

    @keyframes typing {
      50% {
        opacity: 0;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroContentComponent {
  readonly #typewriterService = inject(TypewriterService);
  readonly #translateService = inject(TranslateService);

  protected readonly $typedWord = toSignal(
    this.#translateService.get('home.hero.title.solutions').pipe(
      map((title: string) => title.split('|').map((word) => word.trim())),
      switchMap((words) => this.#typewriterService.typewrite(words)),
    ),
    { initialValue: '' },
  );
}
