import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { SnackBarDto } from './dtos';
import { SnackBarDuration, SnackBarDurationToMilliseconds } from './enums';

@Injectable({ providedIn: 'root' })
export class SnackBarService {
  readonly #snackBar = inject(MatSnackBar);
  readonly #translateService = inject(TranslateService);

  open({ message, action, duration }: SnackBarDto): void {
    const durationInMilliseconds =
      SnackBarDurationToMilliseconds[duration ?? SnackBarDuration.BASE];

    this.#snackBar.open(
      this.#translateService.instant(message) as string,
      this.#translateService.instant(
        action ?? 'snackBar.actions.close',
      ) as string,
      {
        duration: durationInMilliseconds,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      },
    );
  }
}
