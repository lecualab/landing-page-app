import { computed, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { IconDefinition } from '@fortawesome/angular-fontawesome';
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import { map, of } from 'rxjs';
import { SocialNetworkDto, SocialNetworkResponseDto } from './dtos';

@Injectable({ providedIn: 'root' })
export class SocialNetworkService {
  private static readonly SOCIAL_NETWORKS: Readonly<
    Record<string, IconDefinition | undefined>
  > = {
    Facebook: faFacebookF,
    Instagram: faInstagram,
    LinkedIn: faLinkedinIn,
  };

  readonly #socialNetworksResource = rxResource<
    readonly SocialNetworkDto[],
    never
  >({
    loader: () =>
      of<readonly SocialNetworkResponseDto[]>([
        { name: 'Facebook', url: 'https://facebook.com' },
        { name: 'Instagram', url: 'https://instagram.com' },
        { name: 'LinkedIn', url: 'https://linkedin.com' },
      ]).pipe(
        map((socialNetworksResponse) =>
          socialNetworksResponse
            .map((socialNetwork) => {
              const iconDefinition =
                SocialNetworkService.SOCIAL_NETWORKS[socialNetwork.name];

              if (!iconDefinition)
                console.error(`Icon "${socialNetwork.name}" not found`);

              return {
                ...socialNetwork,
                icon: iconDefinition,
              };
            })
            .filter(
              (socialNetwork): socialNetwork is SocialNetworkDto =>
                !!socialNetwork.icon,
            ),
        ),
      ),
  });

  readonly $socialNetworks = this.#socialNetworksResource.value;
  readonly $hasValue = computed(() => this.#socialNetworksResource.hasValue());
}
