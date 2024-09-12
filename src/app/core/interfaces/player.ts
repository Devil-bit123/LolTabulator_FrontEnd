export interface Player {
  sistemas:boolean;
  line:string,
  otp:string,
  ip?:string,
  token:any,
}

export type partialPlayer = Partial<Player>;
