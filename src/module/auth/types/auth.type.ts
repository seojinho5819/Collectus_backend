export interface AccessTokenPayload {
  id: number;
  name: string;
  email: string;
  type: string;
  grade: string;
}

export type RequestUser = AccessTokenPayload;

declare module 'express' {
  export interface Request {
    user: RequestUser;
  }
}
