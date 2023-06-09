type MemeType = {
  memeId: number;
  imageUrl: string;
  name: string;
  username: string;
  userid: string;
  publicFlag: boolean;
  viewCount: number;
  likeCount: number;
  type: string;
  tags: string;
  isLiked: boolean;
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
  tags: string[];
};
type ItemType = {
  ItemId: number;
  name: string;
  imageUrl: string;
  category: string;
}[];
type TotalLikeViewType = {
  viewTotalCount: number;
  likeTotalCount: number;
};
export type {
  MemeType,
  decodedjwtType,
  ProfileType,
  MemeOneType,
  ItemType,
  TotalLikeViewType,
};
