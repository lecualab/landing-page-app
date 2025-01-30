export const SkeletonHeight = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  '2XL': '2xl',
  '3XL': '3xl',
  FULL: 'full',
} as const;

export type SkeletonHeight =
  (typeof SkeletonHeight)[keyof typeof SkeletonHeight];

export const SkeletonHeightValue = {
  [SkeletonHeight.XS]: '1rem',
  [SkeletonHeight.SM]: '2rem',
  [SkeletonHeight.MD]: '4rem',
  [SkeletonHeight.LG]: '8rem',
  [SkeletonHeight.XL]: '16rem',
  [SkeletonHeight['2XL']]: '32rem',
  [SkeletonHeight['3XL']]: '48rem',
  [SkeletonHeight.FULL]: '100%',
} as const satisfies Record<SkeletonHeight, string>;

export type SkeletonHeightValue =
  (typeof SkeletonHeightValue)[keyof typeof SkeletonHeightValue];
