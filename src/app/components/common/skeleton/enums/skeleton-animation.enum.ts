export const SkeletonAnimation = {
  NONE: false,
  PROGRESS: 'progress',
  PULSE: 'pulse',
} as const;

export type SkeletonAnimation =
  (typeof SkeletonAnimation)[keyof typeof SkeletonAnimation];
