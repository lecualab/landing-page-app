import { IconDefinition } from '@fortawesome/angular-fontawesome';

export type SocialNetworkResponseDto = Readonly<{
  name: string;
  url: string;
}>;

export type SocialNetworkDto = Readonly<
  SocialNetworkResponseDto & {
    icon: IconDefinition;
  }
>;
