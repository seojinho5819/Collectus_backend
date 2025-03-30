export const ResponseCode = {
  OK: 200,
} as const;

export type ResponseCode = (typeof ResponseCode)[keyof typeof ResponseCode];
