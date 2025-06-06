import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { first, map, tap } from 'rxjs';
import {
  MetaTagsDto,
  MetaTagsToUpdateDto,
  UpdateMetaTagsOptsDto,
} from './dtos';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private static readonly SITE_NAME = 'Lecualab';
  private static readonly KEYWORDS = [
    SeoService.SITE_NAME,
    SeoService.SITE_NAME.toLowerCase(),
    'empresa de publicidad',
    'agencia de publicidad b2b',
    'agencia de diseño gráfico chile',
    'servicios de branding chile',
    'diseño gráfico para empresas',
    'agencia de marketing visual',
    'corporate branding agency',
    'corporate design services',
    'branding agency for internal communication',
    'visual communication for HR departments',
    'internal communication design agency',
    'agencia de branding corporativo en Chile',
    'diseño gráfico corporativo Temuco',
    'estudio de diseño corporativo Chile',
    'how to improve internal communication with graphic design',
    'visual branding for large organizations',
    'branding and editorial design for HR departments',
    'best corporate design agencies for communication teams',
    'how to brand internal newsletters effectively',
    'empresa de diseño gráfico para marcas en chile',
    'agencia de publicidad especializada en branding b2b',
    'servicios de diseño gráfico para empresas en Santiago',
    'diseño de identidad visual para startups chilenas',
    'agencia creativa especializada en diseño publicitario',
  ] as const;

  readonly #metaTagService = inject(Meta);
  readonly #titleService = inject(Title);
  readonly #document = inject(DOCUMENT);
  readonly #translateService = inject(TranslateService);

  updateMetaTags(metaTags: MetaTagsDto, opts?: UpdateMetaTagsOptsDto): void {
    this.#translateService
      .get([metaTags.title, metaTags.description])
      .pipe(
        first<Record<string, string>>(),
        tap((translations) => {
          this.#titleService.setTitle(
            `${translations[metaTags.title]} | ${SeoService.SITE_NAME}`,
          );
        }),
        map((translations) => {
          const optsWithDefaults: Required<UpdateMetaTagsOptsDto> = {
            index: true,
            ...(opts ?? {}),
          };

          return this.generateMetaTagsToUpdate(
            {
              title: this.#titleService.getTitle(),
              description: translations[metaTags.description],
              image: metaTags.image ?? {
                url: 'https://public-files.lecualab.com/media/images/open-graph/lecualab.webp',
                alt: `Image of Lecualina, the Lecualab's mascot`,
              },
              type: metaTags.type ?? 'website',
              author: SeoService.SITE_NAME,
              keywords: [...SeoService.KEYWORDS, ...(metaTags.keywords ?? [])],
            },
            optsWithDefaults,
          );
        }),
      )
      .subscribe((metaTagsToUpdate) => {
        metaTagsToUpdate.forEach((metaTag) =>
          this.#metaTagService.updateTag(metaTag),
        );
      });
  }

  private generateMetaTagsToUpdate(
    metaTags: MetaTagsToUpdateDto,
    opts: Required<UpdateMetaTagsOptsDto>,
  ): readonly MetaDefinition[] {
    const pathname = this.#document.location.pathname;

    return [
      { name: 'robots', content: opts.index ? 'all' : 'none' },

      { name: 'title', content: metaTags.title },
      { name: 'description', content: metaTags.description },
      { name: 'author', content: metaTags.author },
      { name: 'keywords', content: metaTags.keywords.join(', ') },

      { property: 'og:site_name', content: SeoService.SITE_NAME },
      { property: 'og:title', content: metaTags.title },
      { property: 'og:description', content: metaTags.description },
      { property: 'og:type', content: metaTags.type },
      { property: 'og:image', content: metaTags.image.url },
      { property: 'og:image:alt', content: metaTags.image.alt },
      {
        property: 'og:url',
        content: `https://www.lecualab.com${pathname.endsWith('/') ? pathname : pathname + '/'}`,
      },
      { property: 'og:author', content: metaTags.author },

      { property: 'twitter:card', content: 'summary_large_image' },
    ];
  }
}
