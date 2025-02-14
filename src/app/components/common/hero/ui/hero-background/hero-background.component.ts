import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-hero-background',
  templateUrl: './hero-background.component.html',
  styleUrl: './hero-background.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroBackgroundComponent {
  readonly $height = input<string>('h-full', { alias: 'height' });
}
