import { MetaTagsDto } from '@app/utils/seo';

export type EmbeddedRenderDto = Readonly<{
  id: string;
  name: string;
  renderHtmlBase64: string;
  description: string;
  keywords?: MetaTagsDto['keywords'];
}>;
