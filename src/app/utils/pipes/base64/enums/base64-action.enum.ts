export const Base64Action = {
  ENCODE: 'encode',
  DECODE: 'decode',
} as const;

export type Base64Action = (typeof Base64Action)[keyof typeof Base64Action];
