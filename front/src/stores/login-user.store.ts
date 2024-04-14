import { User } from "@/types/interface";
import { atom } from "recoil";


export const CurrUserAtom = atom<User | null>({
  key: "CurrUser",
  default: null,
});
