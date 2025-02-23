import { SnackBarDuration } from '../enums';

export type SnackBarDto = Readonly<{
  message: string;
  duration?: SnackBarDuration;
}>;
