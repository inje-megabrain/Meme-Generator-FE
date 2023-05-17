type MemeType = {
  wantedId: number;
  imageUrl: string;
  name: string;
}[];
type decodedjwtType = {
  sub: string;
  auth: string;
};
export type { MemeType, decodedjwtType };
