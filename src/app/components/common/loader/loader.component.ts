import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderOptions } from './dtos';
import { LoaderSize, LoaderSizeDiameter } from './enums';

@Component({
  selector: 'app-loader',
  imports: [MatProgressSpinnerModule],
  template: `
    <div data-testid="loader" class="grid h-full place-items-center">
      <mat-spinner [diameter]="$size()" />
    </div>
  `,
  styles: `
    @use '@angular/material' as mat;

    :host {
      @include mat.progress-spinner-overrides(
        (
          active-indicator-color: white,
        )
      );
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  readonly $size = input<LoaderSizeDiameter, LoaderOptions['size']>(
    LoaderSizeDiameter[LoaderSize.MD],
    {
      alias: 'size',
      transform: (size) => LoaderSizeDiameter[size],
    },
  );
}
