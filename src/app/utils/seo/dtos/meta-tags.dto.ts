export type MetaTagsToUpdateDto = Readonly<{
  title: string;
  description: string;
  author: string;
  keywords: readonly string[];
  type: 'website';
  image: Readonly<{
    url: string;
    alt: string;
  }>;
}>;

export type MetaTagsDto = Readonly<
  Pick<MetaTagsToUpdateDto, 'title' | 'description'> &
    Partial<Pick<MetaTagsToUpdateDto, 'type' | 'keywords' | 'image'>>
>;
