type MemeType = {
  memeId: number;
  imageUrl: string;
  name: string;
  username: string;
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
export type { MemeType, decodedjwtType, ProfileType };
