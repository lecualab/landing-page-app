import { HomeHeroDto } from '../../../data-access/home-hero';

export type HeroContentDto = Pick<HomeHeroDto, 'title' | 'subtitle'>;
