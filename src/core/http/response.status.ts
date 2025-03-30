export const ResponseStatus = {
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

export type ResponseStatus =
  (typeof ResponseStatus)[keyof typeof ResponseStatus];
