import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from '@app/components/common/hero';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-hero',
  imports: [HeroComponent, TranslatePipe],
  template: `
    <app-hero
      image="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Black_colour.jpg/180px-Black_colour.jpg"
      class="opacity-80"
      [title]="'contact.hero.title' | translate"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactHeroComponent {}
