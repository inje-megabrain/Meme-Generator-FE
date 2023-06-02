type MemeType = {
  memeId: number;
  imageUrl: string;
  name: string;
  username: string;
  userid: string;
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
type ItemType = {
  ItemId: number;
  name: string;
  imageUrl: string;
  category: string;
}[];
export type { MemeType, decodedjwtType, ProfileType, MemeOneType, ItemType };
