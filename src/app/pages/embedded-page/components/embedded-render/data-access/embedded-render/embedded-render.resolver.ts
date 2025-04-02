import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { map, zip } from 'rxjs';
import { EmbeddedRenderDto } from './dtos';
import { EmbeddedRenderService } from './embedded-render.service';

export const embeddedRenderResolver: ResolveFn<EmbeddedRenderDto> = (route) => {
  const router = inject(Router);
  const embeddedRenderId = route.paramMap.get('id');

  if (!embeddedRenderId) return new RedirectCommand(router.parseUrl('/'));

  const embeddedRenderService = inject(EmbeddedRenderService);

  embeddedRenderService.retrieveEmbeddedRender(embeddedRenderId);

  return zip([
    toObservable(embeddedRenderService.$embeddedRender),
    toObservable(embeddedRenderService.$hasError),
  ]).pipe(
    map(([embeddedRender, hasError]) => {
      if (hasError || !embeddedRender)
        return new RedirectCommand(router.parseUrl('/'));

      return embeddedRender;
    }),
  );
};
