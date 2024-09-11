export interface Player {
  sistemas:boolean;
  line:string,
  otp:string,
  ip?:string,
  token?:string,
}

export type partialPlayer = Partial<Player>;
