import { SnackBarDuration } from '../enums';

export type SnackBarDto = Readonly<{
  message: string;
  action?: string;
  duration?: SnackBarDuration;
}>;
