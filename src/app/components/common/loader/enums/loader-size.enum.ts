export const LoaderSize = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

export type LoaderSize = (typeof LoaderSize)[keyof typeof LoaderSize];

export const LoaderSizeDiameter = {
  [LoaderSize.SM]: 24,
  [LoaderSize.MD]: 48,
  [LoaderSize.LG]: 96,
} as const satisfies Record<LoaderSize, number>;

export type LoaderSizeDiameter =
  (typeof LoaderSizeDiameter)[keyof typeof LoaderSizeDiameter];
