import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoaderComponent } from '../loader';

@Component({
  selector: 'app-button',
  imports: [MatButtonModule, MatIconModule, LoaderComponent],
  template: `
    <button
      mat-flat-button
      extended
      [disabled]="$disabled() || $isLoading()"
      class="w-full"
    >
      @if ($isLoading()) {
        <app-loader size="sm" />
      } @else {
        @if ($icon(); as icon) {
          <mat-icon>{{ icon }}</mat-icon>
        }
        <ng-content />
      }
    </button>
  `,
  styles: `
    :host {
      --mat-sys-primary: var(--color-primary);
    }

    :host-context([color='secondary']) {
      --mat-sys-primary: var(--color-secondary);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  readonly $icon = input<string>(undefined, { alias: 'icon' });
  readonly $disabled = input(false, {
    alias: 'disabled',
    transform: booleanAttribute,
  });
  readonly $isLoading = input(false, {
    alias: 'isLoading',
    transform: booleanAttribute,
  });
}
