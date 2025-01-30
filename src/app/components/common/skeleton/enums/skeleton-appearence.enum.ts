export const SkeletonAppearence = {
  LINE: 'line',
  CIRCLE: 'circle',
} as const;

export type SkeletonAppearence =
  (typeof SkeletonAppearence)[keyof typeof SkeletonAppearence];
