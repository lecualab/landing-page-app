import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeHeroComponent } from './components/home-hero';

@Component({
  imports: [HomeHeroComponent],
  template: `<app-home-hero />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}
