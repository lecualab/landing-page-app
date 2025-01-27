export type TypewriteOpts = Readonly<
  Partial<{
    typing: Partial<{
      speed: number;
      pause: number;
    }>;
    deleting: Partial<{
      speed: number;
      pause: number;
    }>;
  }>
>;
