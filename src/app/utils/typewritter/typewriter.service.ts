import { Injectable } from '@angular/core';
import {
  concat,
  concatMap,
  delay,
  from,
  ignoreElements,
  Observable,
  of,
  repeat,
} from 'rxjs';
import { TypewriteOpts } from './dtos';
import { typeWord } from './operators';

@Injectable({ providedIn: 'root' })
export class TypewriterService {
  typewrite(
    words: readonly string[],
    { typing, deleting }: TypewriteOpts = {},
  ): Observable<string> {
    return from(words).pipe(
      concatMap((word) =>
        concat(
          typeWord({ word, speed: typing?.speed ?? 90 }), // type
          of(void 0).pipe(delay(typing?.pause ?? 800), ignoreElements()), // pause
          typeWord({ word, speed: deleting?.speed ?? 40, backward: true }), // delete
          of(void 0).pipe(delay(deleting?.pause ?? 500), ignoreElements()), // pause
        ),
      ),
      repeat(),
    );
  }
}
