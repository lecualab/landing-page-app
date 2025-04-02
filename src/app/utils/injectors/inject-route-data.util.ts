import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

export function injectRouteData<TData>(key: string) {
  const activatedRoute = inject(ActivatedRoute);

  return toSignal(activatedRoute.data.pipe(map((data) => data[key] as TData)));
}
