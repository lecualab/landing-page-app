import { ActivatedRoute } from '@angular/router';
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
              },
            }),
          },
        },
      ],
    });

    const actual = screen.getByText(expected);

    expect(actual).toBeVisible();
  });
});
