import { ActivatedRoute } from '@angular/router';
import { render, screen } from '@testing-library/angular';
import { of } from 'rxjs';
import { EmbeddedRenderHeroComponent } from './embedded-render-hero.component';

describe('EmbeddedRenderHeroComponent', () => {
  it('should display the title', async () => {
    const expected = 'title';

    await render(EmbeddedRenderHeroComponent, {
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ embeddedRender: { name: expected } }),
          },
        },
      ],
    });

    const actual = screen.getByRole('heading', { level: 1 });

    expect(actual).toBeVisible();
    expect(actual).toHaveTextContent(expected);
  });
});
