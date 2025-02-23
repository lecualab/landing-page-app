export const SnackBarDuration = {
  SHORT: 'short',
  BASE: 'base',
  LONG: 'long',
} as const;

export const SnackBarDurationToMilliseconds = {
  short: 2000,
  base: 4000,
  long: 6000,
} as const satisfies Record<SnackBarDuration, number>;

export type SnackBarDuration =
  (typeof SnackBarDuration)[keyof typeof SnackBarDuration];
