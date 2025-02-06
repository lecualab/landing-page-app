import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LinkComponent } from '@app/components/common/link';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { SocialNetworkDto } from '../../data-access/social-network/dtos';

@Component({
  selector: 'app-social-networks',
  imports: [LinkComponent, FaIconComponent],
  template: `
    <div
      data-testid="social-networks"
      class="flex items-center justify-center gap-x-8"
    >
      @for (socialNetwork of $socialNetworks(); track socialNetwork.name) {
        <app-link
          data-testid="social-network-link"
          [href]="socialNetwork.url"
          noStyle
        >
          <fa-icon
            [icon]="socialNetwork.icon"
            size="lg"
            class="text-dark-gray"
          />
        </app-link>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialNetworksComponent {
  readonly $socialNetworks = input.required<readonly SocialNetworkDto[]>({
    alias: 'socialNetworks',
  });
}
