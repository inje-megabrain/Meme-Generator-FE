type WantedType = {
  description: string;
  imageUrl: string;
  name: string;
  prize: number;
}[];
type decodedjwtType = {
  sub: string;
  auth: string;
};
export type { WantedType, decodedjwtType };
