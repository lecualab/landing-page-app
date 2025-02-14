import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from '@app/components/common/hero';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-hero',
  imports: [HeroComponent, TranslatePipe],
  template: `<app-hero [title]="'contact.hero.title' | translate" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactHeroComponent {}
