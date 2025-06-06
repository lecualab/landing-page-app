import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DOCUMENT,
  HostListener,
  inject,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

// TODO: Find a way to group similar behaviors related with external and internal `href`
@Component({
  selector: 'app-link',
  imports: [MatButtonModule, MatIconModule, RouterModule, NgTemplateOutlet],
  template: `
    @if ($isExternalHref()) {
      @if ($noStyle()) {
        <a data-testid="link" class="no-style" [href]="$href()" target="_blank">
          <ng-container matButtonIcon *ngTemplateOutlet="icon" />
          <ng-container *ngTemplateOutlet="content" />
        </a>
      } @else {
        <a
          data-testid="link"
          [href]="$href()"
          target="_blank"
          mat-flat-button
          [disabled]="$disabled()"
        >
          <ng-container matButtonIcon *ngTemplateOutlet="icon" />
          <ng-container *ngTemplateOutlet="content" />
        </a>
      }
    } @else {
      @if ($noStyle()) {
        <a data-testid="link" class="no-style" [routerLink]="$href()">
          <ng-container matButtonIcon *ngTemplateOutlet="icon" />
          <ng-container *ngTemplateOutlet="content" />
        </a>
      } @else {
        <a
          data-testid="link"
          mat-flat-button
          [routerLink]="$href()"
          [disabled]="$disabled()"
        >
          <ng-container matButtonIcon *ngTemplateOutlet="icon" />
          <ng-container *ngTemplateOutlet="content" />
        </a>
      }
    }

    <ng-template #content>
      <ng-content />
    </ng-template>

    <ng-template #icon>
      @if ($icon(); as icon) {
        <mat-icon>{{ icon }}</mat-icon>
      }
    </ng-template>
  `,
  styles: `
    :host {
      --mat-sys-primary: var(--color-primary);
    }

    :host-context([color='secondary']) {
      --mat-sys-primary: var(--color-secondary);
    }

    :host-context([color='accent']) {
      --mat-sys-primary: var(--color-accent);
    }

    a {
      @apply w-full;
    }

    .no-style {
      @apply flex items-center;

      column-gap: calc(var(--spacing) * 1);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {
  readonly #document = inject(DOCUMENT);

  readonly $color = input<'primary' | 'secondary' | 'terciary'>('primary', {
    alias: 'color',
  });
  readonly $href = input.required<string>({ alias: 'href' });
  readonly $icon = input<string>(undefined, { alias: 'icon' });
  readonly $noStyle = input(false, {
    alias: 'noStyle',
    transform: booleanAttribute,
  });
  readonly $disabled = input(false, {
    alias: 'disabled',
    transform: booleanAttribute,
  });

  protected readonly $isExternalHref = computed(
    () => !this.$href().startsWith('/'),
  );

  @HostListener('click')
  private __scrollToTopWhenComponentIsClicked() {
    if (this.$isExternalHref()) return;

    this.#document.defaultView?.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
