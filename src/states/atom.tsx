import { atom } from "recoil";
import { WantedType } from "../types";

const WantedDataState = atom<WantedType>({
  key: "WantedDataState",
  default: [
    {
      name: "",
      prize: 0,
      description: "",
      imageUrl: "",
    },
  ],
});
export { WantedDataState };
