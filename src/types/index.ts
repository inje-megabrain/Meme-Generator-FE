type MemeType = {
  memeId: number;
  imageUrl: string;
  name: string;
  username: string;
  publicFlag: boolean;
}[];
type decodedjwtType = {
  sub: string;
  auth: string;
};
type ProfileType = {
  name: string;
  email: string;
  username: string;
};
type MemeOneType = {
  memeId: number;
  imageUrl: string;
  name: string;
  username: string;
};
export type { MemeType, decodedjwtType, ProfileType, MemeOneType };
