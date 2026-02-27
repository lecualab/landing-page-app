import { ActivatedRoute } from '@angular/router';
import { SeoService } from '@app/utils/seo';
import { render, screen } from '@testing-library/angular';
import { of } from 'rxjs';
import { EmbeddedRenderComponent } from './embedded-render.component';

describe('EmbeddedRenderComponent', () => {
  it('should create', async () => {
    const expected = 'render-base64';

    await render(EmbeddedRenderComponent, {
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              embeddedRender: {
                renderHtmlBase64: btoa(expected),
                description: 'description',
              },
            }),
          },
        },
        {
          provide: SeoService,
          useValue: {
            updateMetaTags: vi.fn().mockReturnValue(undefined),
          },
        },
      ],
    });

    const actual = screen.getByText(expected);

    expect(actual).toBeVisible();
  });
});
