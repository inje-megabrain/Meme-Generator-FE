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
export type { MemeType, decodedjwtType };
